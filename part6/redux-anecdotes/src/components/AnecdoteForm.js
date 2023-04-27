import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../service/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdoteName.value
        const savedAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(newAnecdote(savedAnecdote))
        dispatch(setNotification(savedAnecdote.content))
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