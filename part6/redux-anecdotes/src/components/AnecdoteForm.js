import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = (e) => {
        e.preventDefault()
        dispatch(newAnecdote(e.target.anecdoteName.value))
        dispatch(setNotification(e.target.anecdoteName.value))
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