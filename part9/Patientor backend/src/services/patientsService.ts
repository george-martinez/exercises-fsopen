import patients from '../data/patients';

import { PatientsWithoutSsn } from '../types';

const getEntries = (): PatientsWithoutSsn[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

export default {
	getEntries
};