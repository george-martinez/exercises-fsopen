import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    newVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => {
        return (
          anecdote.id !== id ? anecdote : changedAnecdote
        )
      })
    },
    newAnecdote(state, action) {
      const newAnecdote = action.payload
      return ([...state, newAnecdote])
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { newVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer