import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const voteToChange = state.find(v => v.id === id)
      const changedVote = {
        ...voteToChange,
        votes: voteToChange.votes + 1
      }
      return state.map(vote =>
        vote.id !== id ? vote : changedVote
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { incrementVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
