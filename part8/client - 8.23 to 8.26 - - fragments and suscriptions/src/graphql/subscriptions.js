import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        name
      }
      title
      published
      genres
    }
  }
`