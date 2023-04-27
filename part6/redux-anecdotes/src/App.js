import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './service/anecdotes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  anecdoteService
    .getAll()
    .then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    })


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App