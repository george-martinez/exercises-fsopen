require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.TEST_MONGODB_URI

const JWT_SECRET = process.env.JWT_SECRET
const JWT_DURATION = process.env.JWT_DURATION

module.exports = {
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    JWT_DURATION
}

