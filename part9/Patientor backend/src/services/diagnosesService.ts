import diagnoses from '../data/diagnoses';
import { Diagnoses } from '../types';

const getEntries = (): Diagnoses[] => {
	return diagnoses;
};

export default {
	getEntries
};