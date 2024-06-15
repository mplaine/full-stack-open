import { calculateExercises, parseExerciseArgs } from './utils';

try {
  const { dailyExerciseHours, targetAmount } = parseExerciseArgs(
    process.argv.slice(2)
  );
  console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
