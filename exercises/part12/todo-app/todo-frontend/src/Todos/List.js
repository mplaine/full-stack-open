import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo) => {
          return <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
        })
        .reduce((acc, cur) => [...acc, <hr key={uuidv4()} />, cur], [])}
    </>
  )
}

export default TodoList
