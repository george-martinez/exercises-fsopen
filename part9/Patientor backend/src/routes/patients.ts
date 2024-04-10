import express from 'express';
import patientService from '../services/patientsService';
import toNewPatientEntry from '../utils';


const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
	res.send(patientService.getEntries());
});

patientRouter.post('/', (req, res) => {
	try {
		const patientToAdd = toNewPatientEntry(req.body);
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


export default patientRouter;