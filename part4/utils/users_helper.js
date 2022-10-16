const User = require('../models/userModel')

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

module.exports = { usersInDb, initialUsers }