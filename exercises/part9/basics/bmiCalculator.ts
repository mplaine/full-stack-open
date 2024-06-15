import { parseBmiArgs } from './utils';

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

try {
  const { height, weight } = parseBmiArgs(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
