const User = require('../models/userModel')
const { GraphQLError } = require('graphql')

const typeDef = `
    extend type Query {
        me: User
    }

    extend type Mutation {
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
`

const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
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
    }
}

module.exports = { typeDef, resolvers }