import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientWithoutSsn, newPatientEntry } from '../types';

const getEntries = (): PatientWithoutSsn[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation, 
		entries
	}));
};

const getPatient = (id: string): Patient => {
	const filteredPatient = patients.find((patient) => patient.id === id);

	if(!filteredPatient || typeof filteredPatient !== 'object'){
		throw new Error('Error getting the info.');
	}

	return (filteredPatient);
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
	addPatient,
	getPatient
};