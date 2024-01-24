import { createSlice } from '@reduxjs/toolkit'

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
export default anecdoteSlice.reducer
