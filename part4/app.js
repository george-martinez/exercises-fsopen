const { connectDB } = require('./mongo')

if (process.env.NODE_ENV === 'production'){
    connectDB()
}

const express = require('express')
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')

const app = express()

const blogsController = require('./controllers/blogsController')

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsController)

app.use(middleware.errorHandler)

app.use(middleware.unknownEndpoint)

module.exports = app