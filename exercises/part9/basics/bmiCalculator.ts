import { calculateBmi, parseBmiArgs } from './utils';

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
