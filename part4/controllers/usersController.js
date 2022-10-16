const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')

    res.status(200).json(users)
})

userRouter.get('/deletemany', async (req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    res.end()
})

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if(!username || !password) return res.status(400).json({
        error: 'request must have username and password fields'
    })

    if(password.length < 3) return res.status(400).json({
        error: 'password must be at least 3 characters long'
    })

    if(username.length < 3) return res.status(400).json({
        error: 'username must be at least 3 characters long'
    })

    const existingUser = await User.findOne({ username })
    if(existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userToAdd = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await userToAdd.save()

    res.status(201).json(savedUser)
})

module.exports = userRouter