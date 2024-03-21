const jwt = require('jsonwebtoken')
const Author = require('./models/authorModel')
const Book = require('./models/bookModel')
const User = require('./models/userModel')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
        
        let addedBook = null
        console.log("🚀 ~ file: library-backend.js:90 ~ addBook: ~ bookToAdd:", bookToAdd)
        
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
        
        pubsub.publish('BOOK_ADDED', { bookAdded: bookToAdd })
        
        return addedBook.populate("author")
      },
      editAuthor: async (root, args, { currentUser }) => {
        if(!currentUser){
          throw new GraphQLError('Not authenticated', {
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
          favoriteGenre: user.favoriteGenre,
          id: user.id
        }
  
        return { token: {value: jwt.sign(userForToken, process.env.JWT_SECRET)}, user: userForToken }
      }
    },
    Subscription: {
        bookAdded:  {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers