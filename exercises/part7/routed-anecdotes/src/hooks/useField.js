import { useState } from 'react'

const useField = (name, type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const getAttributes = () => {
    return {
      name,
      type,
      value,
      onChange,
    }
  }

  return {
    name,
    type,
    value,
    onChange,
    reset,
    getAttributes,
  }
}

export default useField
