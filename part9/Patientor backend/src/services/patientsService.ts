import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientWithoutSsn, newPatientEntry } from '../types';

const getEntries = (): PatientWithoutSsn[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: newPatientEntry): Patient => {
	const id = uuid();

	const newPatientEntry = {
		id,
		...entry
	};

	patients.push(newPatientEntry);
	
	return newPatientEntry;
};

export default {
	getEntries,
	addPatient
};