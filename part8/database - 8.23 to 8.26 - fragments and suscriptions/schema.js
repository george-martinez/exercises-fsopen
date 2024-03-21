const { merge } = require('lodash')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const Author = require('./schema/authorSchema').typeDef
const Book = require('./schema/bookSchema').typeDef
const LoggedUser = require('./schema/loggedUserSchema').typeDef
const User = require('./schema/userSchema').typeDef
const Token = require('./schema/tokenSchema').typeDef

const authorResolvers = require('./schema/authorSchema').resolvers
const bookResolvers = require('./schema/bookSchema').resolvers
const loggedUserResolvers = require('./schema/loggedUserSchema').resolvers
const userResolvers = require('./schema/userSchema').resolvers
const tokenResolvers = require('./schema/tokenSchema').resolvers

const Query = `
  type Query {
    _empty: String
  }
`

const Mutation = `
  type Mutation {
    _empty: String
  }
`

const Subscription = `
  type Subscription {
    _empty: String
  }
`

const schema = makeExecutableSchema({ 
  typeDefs: [ Query, Mutation, Subscription, Author, Book, User, LoggedUser, Token ], 
  resolvers: merge(authorResolvers, bookResolvers, loggedUserResolvers, tokenResolvers, userResolvers)
})

module.exports = schema