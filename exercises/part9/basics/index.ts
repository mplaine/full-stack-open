import express from 'express';
import {
  calculateBmi,
  calculateExercises,
  parseBmiArgs,
  parseExerciseBody,
} from './utils';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  try {
    const { dailyExerciseHours, targetAmount } = parseExerciseBody(req.body);
    res.json(calculateExercises(dailyExerciseHours, targetAmount));
  } catch (error: unknown) {
    let errorMessage: string = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({
      error: errorMessage,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
