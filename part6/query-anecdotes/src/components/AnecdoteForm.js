import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../context/NotificationContext'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newNote))
      notificationDispatch({ type: 'set', payload: `Anecdote '${newNote.content}' was created.`})
    },
    onError: (error) => {
      const errorData = error?.response?.data?.error === undefined ? 'server is not responding.' : error.response.data.error
      notificationDispatch({ type: 'set', payload: `Couldn't save the new anecdote, ${errorData}`})
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })

    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
