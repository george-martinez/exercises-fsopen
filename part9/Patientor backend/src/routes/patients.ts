import express from 'express';
import patientService from '../services/patientsService';
import { toNewPatient, toNewPatientEntry } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
	res.send(patientService.getEntries());
});

patientRouter.get('/:id', (req, res) => {
	res.send(patientService.getPatient(req.params.id));
});

patientRouter.post('/', (req, res) => {
	try {
		const patientToAdd = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(patientToAdd);
		res.status(200).json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

patientRouter.post('/:id/entries', (req, res) => {
	const { id } = req.params;

	if(!id) {
		res.status(400).send('Bad request. Use a correct patient ID.');
	}

	try {
		const entryToAdd = toNewPatientEntry(req.body);
		const addedPatient = patientService.addPatientEntry(id, entryToAdd);
		res.status(200).json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});


export default patientRouter;