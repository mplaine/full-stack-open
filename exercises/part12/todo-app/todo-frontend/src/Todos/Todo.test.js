/* eslint-disable testing-library/no-render-in-setup */
import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Todo from './Todo'

describe('<Todo />', () => {
  const todo = {
    _id: '65bb959f4adf4f1cc9e9ede5',
    text: 'Test code',
    done: true
  }
  const deleteTodo = jest.fn()
  const completeTodo = jest.fn()
  let container

  beforeEach(() => {
    container = render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />).container
  })

  test('renders text', async () => {
    expect(container).toHaveTextContent(`${todo.text}`)
  })
})
