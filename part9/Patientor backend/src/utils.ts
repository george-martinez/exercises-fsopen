import { Diagnose, Discharge, EntryTypes, EntryWithoutId, Gender, HealthCheckRating, SickLeaveParam, newBaseEntry, newPatient } from './types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
	if(!isString(name)){
		throw new Error('Incorrect or missing name'); 
	}

	return name;
};

const parseDateOfBirth = (date: unknown): string => {
	if(!isString(date) || !isDate){
		throw new Error('Incorrect date: ' + date);
	}

	return date;
};

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender).map(value => value.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
	if(!isString(gender) || !isGender(gender)){
		throw new Error('Incorrect or missing gender'); 
	}

	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if(!isString(occupation)){
		throw new Error('Incorrect or missing occupation'); 
	}

	return occupation;
};

const parseSsn = (ssn: unknown): string => {
	if(!isString(ssn)){
		throw new Error('Incorrect or missing ssn'); 
	}

	return ssn;
};

const toNewPatient = (object: unknown) => {
	if(!object || typeof object !== 'object'){
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {
		const newEntry: newPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			ssn: parseSsn(object.ssn),
			entries: []
		};
      
		return newEntry;
	}
    
	throw new Error('Incorrect data: a field missing');
};

const parseEntryDescription = (description: unknown): string => {
	if(!isString(description)){
		throw new Error('Incorrect or missing description'); 
	}

	return description;
};

const parseEntryDate = (date: unknown): string => {
	if(!isString(date) || !isDate){
		throw new Error('Incorrect date: ' + date);
	}

	return date;
};

const parseEntrySpecialist = (specialist: unknown): string => {
	if(!isString(specialist)){
		throw new Error('Incorrect or missing specialist specialistName'); 
	}

	return specialist;
};

const parseEntryDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<Diagnose['code']>;
	}
  
	return object.diagnosisCodes as Array<Diagnose['code']>;
};

const isEntryType = (type: string): type is EntryTypes => {
	return Object.values(EntryTypes).map(e => e.toString()).includes(type);
};

const parseEntryType = (type: unknown): EntryTypes => {
	if(!isString(type) || !isEntryType(type)){
		throw new Error('Incorrect or missing entry type');
	}
	
	return type;
};

const isDischarge = (discharge: object): discharge is Discharge => {
	return ('date' in discharge && 'criteria' in discharge);
}; 

const parseEntryDischargeType = (discharge: unknown): Discharge => {
	if(!discharge || typeof discharge !== 'object' || !isDischarge(discharge)){
		throw new Error('Incorrect or missing discharge data');
	}

	return discharge;
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeaveParam => {
	return ('startDate' in sickLeave && 'endDate' in sickLeave);
}; 

const parseEntrySickLeave = (sickLeave: unknown): SickLeaveParam | undefined => {
	if (!sickLeave || typeof sickLeave !== 'object' || !isSickLeave(sickLeave)) {
		return undefined as unknown as SickLeaveParam;
	}

	return sickLeave;
};

const isNumber = (argument: unknown): argument is number => {
	return !isNaN(Number(argument));
};

const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
	if(!isNumber(object) || !isHealthCheckRating(object)){
		throw new Error('Incorrect or missing entry health check rating');
	}
	
	return object;
};

const parseBaseEntry = (object: object): newBaseEntry => {
	if('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
		const baseEntry: newBaseEntry = {
			description: parseEntryDescription(object.description),
			date: parseEntryDate(object.date),
			specialist: parseEntrySpecialist(object.specialist),
			diagnosisCodes: parseEntryDiagnosisCodes(object),
		};

		return baseEntry;
	}

	throw new Error('Incorrect data: a field is missing in the new Entry.');
};

const parseEntry = (object: object): EntryWithoutId => {
	const baseEntry = parseBaseEntry(object);
	
	if('type' in object && Boolean(parseEntryType(object.type))){
		const parsedObjectTypes = parseEntryType(object.type);

		switch (parsedObjectTypes) {
		case EntryTypes.HealthCheck:
			if ('healthCheckRating' in object) {
				return {
					...baseEntry,
					type: EntryTypes.HealthCheck,
					healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
				};
			}
			throw new Error('Incorrect data: a field healthCheckRating is missing');

		case EntryTypes.Hospital:
			if ('discharge' in object) {
				return {
					...baseEntry,
					type: EntryTypes.Hospital,
					discharge: parseEntryDischargeType(object.discharge),
				};
			}
			throw new Error('Incorrect data: a field discharge is missing');

		case EntryTypes.OccupationalHealthcare:
			if ('employerName' in object) {
				const occupationalEntry = {
					...baseEntry,
					employerName: parseName(object.employerName),
				};
				if ('sickLeave' in object) {
					return {
						...occupationalEntry,
						type: EntryTypes.OccupationalHealthcare,
						sickLeave: parseEntrySickLeave(object.sickLeave),
					};
				}
				return {
					...occupationalEntry,
					type: EntryTypes.OccupationalHealthcare,
				};
			}
			throw new Error('Incorrect data: a field employerName | sickLeave is missing');

		default:
			assertNever(parsedObjectTypes);
		}

	}
  
	throw new Error('Incorrect data: a field is missing');
};


  
const toNewPatientEntry = (object: unknown) => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	return parseEntry(object);
};


export { toNewPatient, toNewPatientEntry };