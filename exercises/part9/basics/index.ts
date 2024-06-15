import express from 'express';
import { parseBmiArgs } from './utils';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const paramHeight: string = (req.query.height as string) || '';
  const paramWeight: string = (req.query.weight as string) || '';

  try {
    const { height, weight } = parseBmiArgs(
      [paramHeight, paramWeight].filter(Boolean)
    );
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } catch (error) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
