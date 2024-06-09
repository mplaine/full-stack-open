const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2)

  let message = ''
  if (bmi < 18.5) {
    message = 'Underweight'
  } else if (bmi < 25) {
    message = 'Normal (healthy weight)'
  } else if (bmi < 30) {
    message = 'Overweight'
  } else {
    message = 'Obese'
  }

  return message
}

console.log(calculateBmi(180, 74))
