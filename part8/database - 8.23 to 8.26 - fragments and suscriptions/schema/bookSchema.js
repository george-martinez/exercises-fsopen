const Author = require('../models/authorModel')
const Book = require('../models/bookModel')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDef = `
    extend type Query {
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!    
    }

    extend type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
    }

    extend type Subscription {
        bookAdded: Book
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.countDocuments(),
        allBooks: async (root, args) => {
            if(!args?.author && !args?.genre){
            return Book.find({}).populate("author")
            }
            
            let author = null
            
            const filters = {}
    
            if(args?.genre) {
            filters.genres = args.genre
            }
    
            if(args?.author) {
            author = await Author.find({ name: args.author })
            filters.author = author
            }
    
            return Book.find(filters).populate("author")
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if(!currentUser){
              throw new GraphQLError('Not authenticated', {
                extensions: {
                  code: 'FORBIDDEN'
                }
              })
            }
            
            const authorDB = await Author.findOne({ name: args.author })
            const bookToAdd = new Book({ ...args })
      
            if(!authorDB){
              const newAuthor = new Author({ name: args.author })
              bookToAdd.author = newAuthor._id
              newAuthor.books = newAuthor.books.concat(bookToAdd._id)
              try {
                await newAuthor.save()
              } catch (error) {
                throw new GraphQLError('Saving author failed', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: Object.entries(args)
                  }
                })
              }
            } else{
              bookToAdd.author = authorDB._id
              authorDB.books = authorDB.books.concat(bookToAdd._id)
              await authorDB.save()
            }
            
            let addedBook = null
            
            try {
              addedBook = await bookToAdd.save()
            } catch (error) {
              throw new GraphQLError(`Saving book failed.`, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: Object.entries(args),
                  error
                }
              })
            }

            let populatedBook = await addedBook.populate("author")
            
            pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
            
            return populatedBook
          },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
        }
    }
}

module.exports = { typeDef, resolvers }