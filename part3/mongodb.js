require('dotenv').config()

const url = process.env.MONGODB_URI

const mongoose = require('mongoose')

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })