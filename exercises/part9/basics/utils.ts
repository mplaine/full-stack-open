interface BmiValues {
  height: number;
  weight: number;
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  dailyExerciseHours: number[];
  targetAmount: number;
}

const parseBmiArgs = (args: string[]): BmiValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const parseExerciseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 2) throw new Error('Not enough arguments');

  if (
    !isNaN(Number(args[0])) &&
    args.slice(1).every((arg) => !isNaN(Number(arg)))
  ) {
    return {
      dailyExerciseHours: args.slice(1).map(Number),
      targetAmount: Number(args[0]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseExerciseBody = (body: any): ExerciseValues => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExerciseHours: number[] = body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const targetAmount: number = body.target;

  if (!dailyExerciseHours || !targetAmount) {
    throw new Error('parameters missing');
  }

  if (
    dailyExerciseHours.some((value) => isNaN(Number(value))) ||
    isNaN(Number(targetAmount))
  ) {
    throw new Error('malformatted parameters');
  }

  return {
    dailyExerciseHours: dailyExerciseHours.map(Number),
    targetAmount: Number(targetAmount),
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);

  let message = '';
  if (bmi < 18.5) {
    message = 'Underweight';
  } else if (bmi < 25) {
    message = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    message = 'Overweight';
  } else {
    message = 'Obese';
  }

  return message;
};

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): ExerciseResult => {
  const average: number =
    dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length;
  const success: boolean = average >= targetAmount ? true : false;
  let rating: number;
  let ratingDescription: string;
  if (average >= targetAmount) {
    rating = 3;
    ratingDescription = 'good';
  } else if (average >= targetAmount - 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
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

export {
  calculateBmi,
  calculateExercises,
  parseBmiArgs,
  parseExerciseArgs,
  parseExerciseBody,
};
