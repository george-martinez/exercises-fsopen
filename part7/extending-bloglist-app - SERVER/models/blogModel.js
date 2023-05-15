const mongoose = require('mongoose')
const User = require('./userModel')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: String,
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

blogSchema.pre('deleteOne', { document: false, query: true }, async function () {
    const blogToDelete = await this.model.findOne(this.getFilter())

    const userId =  blogToDelete.user.toString()

    const user = await User.findById(userId)

    const index = user.blogs.indexOf(userId)

    user.blogs.splice(index, 1)

    await user.save()
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog