const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../utils/config').JWT_SECRET
const JWT_DURATION = require('../utils/config').JWT_DURATION

const initialUsers = [
    {
        'username': 'root',
        'password': 'testpass',
        'name': 'Test Name'
    },
    {
        'username': 'jorge',
        'password': 'password123',
        'name': 'Jorge Martinez'
    }
]

const usersInDb = async () => {
    const users = await User.find({})

    return users.map(user => user.toJSON())
}

const saveUserInDb = async ({ username, name, password }) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userToAdd = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await userToAdd.save()

    return savedUser
}

const loginUser = async ({ username, password }) => {
    const user = await User.findOne({ username })

    await bcrypt.compare(password, user.passwordHash)

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: JWT_DURATION })

    return {
        token,
        username: user.username,
        name: user.name,
        user: user._id
    }
}

module.exports = { usersInDb, initialUsers, saveUserInDb, loginUser }