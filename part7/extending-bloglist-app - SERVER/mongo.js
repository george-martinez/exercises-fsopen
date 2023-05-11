const config = require('./utils/config')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

console.log('connecting to', url)

const options = {}

const connectDB = () => {
    return mongoose.connect(url, options)
        .then(() => {
            console.log('Database connected')
        }).catch(err => {
            console.error(err)
        })
}

const closeDB = async () => {
    return await mongoose.disconnect()
}

module.exports = { connectDB, closeDB }