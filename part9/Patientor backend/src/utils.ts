import { Gender, newPatientEntry } from './types';

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

const toNewPatientEntry = (object: unknown) => {
	if(!object || typeof object !== 'object'){
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {
		const newEntry: newPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			ssn: parseSsn(object.ssn)
		};
      
		return newEntry;
	}
    
	throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;