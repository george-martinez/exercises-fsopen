if (process.env.NODE_ENV !== 'test'){
    const { connectDB } = require('./mongo')
    connectDB()
}

const express = require('express')
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')

const app = express()

const blogsController = require('./controllers/blogsController')
const usersController = require('./controllers/usersController')
const loginController = require('./controllers/loginController')

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'e2etest') {
    const testingController = require('./controllers/testingController')
    app.use('/api/testing', testingController)
}

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginController)
app.use('/api/users', usersController)
app.use('/api/blogs', blogsController)

app.use(middleware.errorHandler)

app.use(middleware.unknownEndpoint)

module.exports = app