import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
      addBook(title: $title, author: $author, published: $published, genres: $genres) {
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

export const LOGIN = gql`
  mutation login($username: String!, $pass: String!) {
    login(username: $username, password: $pass){
      token {
        value
      }
      user {
        username
        favoriteGenre
      }
    }
  }
`