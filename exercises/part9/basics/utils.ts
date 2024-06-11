interface BmiArgs {
  height: number
  weight: number
}

interface ExerciseArgs {
  dailyExerciseHours: number[]
  targetAmount: number
}

const parseBmiArgs = (args: string[]): BmiArgs => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (args.length > 2) throw new Error('Too many arguments')

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const parseExerciseArgs = (args: string[]): ExerciseArgs => {
  if (args.length < 2) throw new Error('Not enough arguments')

  if (!isNaN(Number(args[0])) && args.slice(1).every((arg) => !isNaN(Number(arg)))) {
    return {
      dailyExerciseHours: args.slice(1).map(Number),
      targetAmount: Number(args[0])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export { parseBmiArgs, parseExerciseArgs }
