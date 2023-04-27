import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => anecdote.content.indexOf(state.filter) !== -1)
    })
    
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(newVote(id))
        dispatch(setNotification(anecdotes.find(anecdotes => anecdotes.id === id).content))
    }

    return(
        <>
            {anecdotes
                .slice()
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList