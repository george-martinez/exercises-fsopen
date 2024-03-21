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
          author {
            name
          }
          title
          published
          genres
        }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_BY_GENRE = gql`
  query ($genre: String) {
      allBooks (genre: $genre) {
          author {
            name
          }
          title
          published
          genres
      }
  }
`