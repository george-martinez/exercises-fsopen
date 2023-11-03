const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const Author = require('./models/authorModel')
const Book = require('./models/bookModel')

const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')
mongoose.set('strictQuery', false)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log("🚀 ~ file: library-backend.js:88 ~ process.env.MONGODB_URI:", process.env.MONGODB_URI)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    /* Author.collection.drop()
    Book.collection.drop() */
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
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
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return Book.countDocuments({ author })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorDB = await Author.findOne({ name: args.author })
      const bookToAdd = new Book({ ...args })

      if(!authorDB){
        const newAuthor = await new Author({ name: args.author })
        bookToAdd.author = newAuthor._id
        await newAuthor.save()
      } else{
        bookToAdd.author = authorDB._id
      }

      const addedBook = await bookToAdd.save()

      return addedBook.populate("author")
    },
    editAuthor: async (root, args) => {
      if(!args?.name || !args?.setBornTo) {
        return null
      }
      const author = await Author.findOne({ name: args.name })

      if(!author){
        return null
      }

      author.born = args.setBornTo

      return author.save()
    }
  }
}
console.log("🚀 ~ file: library-backend.js:131 ~ resolvers.Author.root:", resolvers.Author.root)
console.log("🚀 ~ file: library-backend.js:131 ~ resolvers.Author.root:", resolvers.Author.root)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
