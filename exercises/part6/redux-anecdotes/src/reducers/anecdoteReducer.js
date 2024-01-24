import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    replaceAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
    },
  }
})

export const { appendAnecdote, setAnecdotes, replaceAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const retrievedAnecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(retrievedAnecdotes))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToUpdate = anecdotes.find(a => a.id === id)
    const anecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.updateAnecdote(id, anecdote)
    dispatch(replaceAnecdote(updatedAnecdote))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = {
      content,
      votes: 0,
    }
    const createdAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch(appendAnecdote(createdAnecdote))
  }
}

export default anecdoteSlice.reducer
