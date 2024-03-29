import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';
import isNotNumber from './utils/isNotNumber';

const app = express();

app.use(express.json());

interface ArgumentValues {
    daily_exercises: number[],
    target: number,
}

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const weight = Number(req.query.weight);
	const height = Number(req.query.height);

	if (isNaN(weight) || isNaN(height)) {
		return res.status(400).send('malformatted parameters');
	}

	const bmi = bmiCalculator(height, weight);

	return res.status(200).json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body as ArgumentValues;

	if(!daily_exercises  || !target || !daily_exercises?.length) {
		return res.status(400).send('parameters missing');
	}

	if(isNotNumber(target)) {
		return res.status(400).send('malformatted parameters');
	}
	
	for(let i = 0; i < daily_exercises.length; i++) {
		if(isNotNumber(daily_exercises[i])) {
			return res.status(400).send('malformatted parameters, must provide an array of numbers.');
		}
	}

	const result = exerciseCalculator(daily_exercises, target);

	return res.status(200).json(result);
});


const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});