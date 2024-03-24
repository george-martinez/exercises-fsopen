import { useState } from 'react'
import { ALL_AUTHORS, BOOK_BY_GENRE } from '../graphql/queries'
import { CREATE_BOOK } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

import { updateCache } from '../App'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ]= useMutation(CREATE_BOOK, {
      refetchQueries: [ { query: ALL_AUTHORS } ],
      update: (cache, response) => {
        updateCache(cache, { query: BOOK_BY_GENRE, variables: {genre: ''} }, response.data.addBook)
      },
      onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        setError(messages)
      },
      //awaitRefetchQueries: true,
    },
  ) 

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.valueAsNumber)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook