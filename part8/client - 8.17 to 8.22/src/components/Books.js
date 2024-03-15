import { useQuery } from "@apollo/client"
import { BOOK_BY_GENRE } from "../queries"
import { useEffect, useState } from "react"

const Books = () => {
  const [genreFilter, setGenreFilter] = useState('')
  const [books, setBooks] = useState([])

  const result = useQuery(BOOK_BY_GENRE, {
    variables: { genre: genreFilter },
  })

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result?.data])

  if(result.loading && !result?.data) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...new Set(books.map(book => book.genres).flat())].map(genre => <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>)}
        <button onClick={() => setGenreFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
