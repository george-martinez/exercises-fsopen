const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { GraphQLError } = require('graphql')

const typeDef = `
    extend type Mutation {
        login(
            username: String!
            password: String!
          ): LoggedUser
    }

    type LoggedUser {
        token: Token
        user: User
    }
`

const resolvers = {
    Mutation: {
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
    }
}

module.exports = { typeDef, resolvers }