import anecdoteReducer from './anecdoteReducer'
import deepFreeze from "deep-freeze";

describe('anecdoteReducer', () => {
    test('adds a new anecdote with action anecdotes/newAnecdote', () => {
        const state = []

        const action = {
            type: 'anecdotes/newAnecdote',
            payload: 'the app state is in redux store',
        }

        deepFreeze(state)

        const newState = anecdoteReducer(state, action)
        console.log("🚀 ~ file: anecdoteReducer.test.js:23 ~ test ~ newState:", newState)
        
        expect(newState).toHaveLength(1)
        expect(newState.map(s => s.content)).toContainEqual(action.payload)
    })

    test('vote an anecdote with action anecdotes/newVote', () => {
        const state = [
            {
              content: 'the app state is in redux store',
              id: 1,
              votes: 0
            },
            {
              content: 'state changes are made with actions',
              id: 2,
              votes: 0
            }
        ]

        deepFreeze(state)

        const action = {
            type: 'anecdotes/newVote',
            payload: 2
        }

        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({
            content: 'state changes are made with actions',
            id: 2,
            votes: 1
        })
    })
})