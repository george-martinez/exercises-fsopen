import { useEffect, useState } from "react"

const Books = ({ booksResult, setGenreFilter }) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    if(booksResult?.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult?.data])

  if(booksResult?.loading && !booksResult?.data) {
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
