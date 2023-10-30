import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            born
            bookCount
            id
            name
        }
    }
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        author
        title
        published
      }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author
      genres
      published
      title
      id
    }
  }
`

export const SET_AUTHOR_BORN = gql`
mutation setAuthorBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`