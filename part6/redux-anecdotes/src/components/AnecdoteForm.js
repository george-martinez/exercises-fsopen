import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = (e) => {
        e.preventDefault()
        dispatch(newAnecdote(e.target.anecdoteName.value))
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