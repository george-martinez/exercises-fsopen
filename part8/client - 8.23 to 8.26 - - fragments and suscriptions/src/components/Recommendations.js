import { BOOK_BY_GENRE } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const Recommendations = ({ user }) => {
    const { favoriteGenre } = user
    
    const result = useQuery(BOOK_BY_GENRE, {
        variables: { genre: favoriteGenre }
    })
  
    if(result.loading) {
      return <div>loading...</div>
    }
  
    const books = result.data.allBooks

    return (
        <div>
            <h2>Books in your favorite genre {favoriteGenre}</h2>
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
        </div>
    )
}

export default Recommendations