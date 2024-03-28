import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

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


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});