interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseArgs {
  dailyExerciseHours: number[]
  targetAmount: number
}

const parseExerciseArgs = (args: string[]): ExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments')

  if (!isNaN(Number(args[2])) && args.slice(3).every((arg) => !isNaN(Number(arg)))) {
    return {
      dailyExerciseHours: args.slice(3).map(Number),
      targetAmount: Number(args[2])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
  const average: number = dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length
  const success: boolean = average >= targetAmount ? true : false
  let rating: number
  let ratingDescription: string
  if (average >= targetAmount) {
    rating = 3
    ratingDescription = 'good job'
  } else if (average >= targetAmount - 1) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'try harder'
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((exerciseHours) => exerciseHours > 0).length,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  }
}

try {
  const { dailyExerciseHours, targetAmount } = parseExerciseArgs(process.argv)
  console.log(calculateExercises(dailyExerciseHours, targetAmount))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
