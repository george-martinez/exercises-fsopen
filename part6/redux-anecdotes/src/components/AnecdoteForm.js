import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdoteName.value
        dispatch(createAnecdote(anecdote))
        dispatch(createNotification(anecdote, 5))
        e.target.anecdoteName.value = ''
    }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <div><input name='anecdoteName'/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm