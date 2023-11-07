const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const Author = require('./models/authorModel')
const Book = require('./models/bookModel')
const User = require('./models/userModel')

const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')
const { typeDefs } = require('./typedefs')
mongoose.set('strictQuery', false)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    /* Author.collection.drop()
    Book.collection.drop() */
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return Book.countDocuments({ author })
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser){
        throw GraphQLError('Not authenticated', {
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
      }

      const addedBook = null

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


      return addedBook.populate("author")
    },
    editAuthor: async (root, args, { currentUser }) => {
      if(!currentUser){
        throw GraphQLError('Not authenticated', {
          extensions: {
            code: 'FORBIDDEN'
          }
        })
      }

      if(!args?.name || !args?.setBornTo) {
        throw new GraphQLError('Missing parameters.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: Object.entries(args)
          }
        })
      }
      const author = await Author.findOne({ name: args.name })

      if(!author){
        throw new GraphQLError('Invalid author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: Object.entries(args)
          }
        })
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: Object.entries(args),
            error
          }
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args?.username, favoriteGenre: args?.favoriteGenre })

      return user.save()
      .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      
      if(!user || args.password !== 'secret'){
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user.id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
