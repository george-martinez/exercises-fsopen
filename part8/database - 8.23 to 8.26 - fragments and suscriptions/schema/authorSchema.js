const Author = require('../models/authorModel')
const Book = require('../models/bookModel')
const { GraphQLError } = require('graphql')

const typeDef = `
    extend type Query {
        authorCount: Int!
        allAuthors: [Author!]!      
    }

    extend type Mutation {
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }
`

const resolvers = {
    Query: {
        authorCount: async () => Author.countDocuments(),
        allAuthors: async () => Author.find({}),
  
    },
    Mutation: {
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
    },
    Author: {
        bookCount: async (root) => {
          const author = await Author.findOne({ name: root.name })
          return Book.countDocuments({ author })
        }
    },
}


module.exports = { typeDef, resolvers }