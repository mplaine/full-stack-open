import { parseExerciseArgs } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): Result => {
  const average: number =
    dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length;
  const success: boolean = average >= targetAmount ? true : false;
  let rating: number;
  let ratingDescription: string;
  if (average >= targetAmount) {
    rating = 3;
    ratingDescription = 'good job';
  } else if (average >= targetAmount - 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'try harder';
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter(
      (exerciseHours) => exerciseHours > 0
    ).length,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  };
};

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
