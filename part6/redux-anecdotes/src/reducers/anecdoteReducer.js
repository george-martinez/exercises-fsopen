import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/anecdotes'


const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    newVote(state, action) {
      const id = action.payload.id
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

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await noteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const createdAnecdote = await noteService.createNew(content)
    dispatch(newAnecdote(createdAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const modifiedAnecdoteResponse = await noteService.vote(id)
    dispatch(newVote(modifiedAnecdoteResponse))
  }
}

export default anecdoteSlice.reducer