const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../utils/config').JWT_SECRET
const JWT_DURATION = require('../utils/config').JWT_DURATION

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if(!username || !password) return response.status(400).json({
        error: 'request must have username and password fields'
    })

    const user = await User.findOne({ username })

    const correctPassword = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if(!user || !correctPassword) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }


    const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: JWT_DURATION })

    response.status(200).json({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter