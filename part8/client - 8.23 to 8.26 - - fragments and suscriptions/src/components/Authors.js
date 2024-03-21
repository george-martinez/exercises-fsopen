import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../graphql/queries"
import { SET_AUTHOR_BORN } from "../graphql/mutations"
import { useState } from "react"

const Authors = ({ setError }) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [setAuthorBorn] = useMutation(SET_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(`Error: ${error.graphQLErrors[0].message}`)
    }
  })

  if(result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const editAuthor = (event) => {
    event.preventDefault()

    setAuthorBorn({ variables: { name, setBornTo: born } })

    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={editAuthor}>
            <div>
              select name
              <select 
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                <option></option>
                {authors.map(author => <option key={author.name}>{author.name}</option>)}
              </select>
            </div>
            <div>
              born
              <input type="number" value={born} onChange={({ target }) => setBorn(target.valueAsNumber)}/>
            </div>
            <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
