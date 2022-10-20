const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const userExtractor = require('../utils/middleware').userExtractor

const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')

    response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
    const { title, author, url } = request.body

    if(!title || !url ) return response.status(400).json({ error: 'title and url are required parameters' })

    const user = await User.findById(request.user.id)
    if(!user) return response.status(401).json({ error: 'Invalid or missing user' })

    const blogToAdd = new Blog({
        title,
        author,
        url,
        likes: request.body.likes || 0,
        user: user._id
    })

    const addedBlog = await blogToAdd.save()

    user.blogs = user.blogs.concat(addedBlog._id)

    await user.save()

    response.status(201).json(addedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const id = request.params.id
    console.log('🚀 ~ file: blogsController.js ~ line 40 ~ blogRouter.delete ~ id', id)

    const blogToDelete = await Blog.findById(id)

    if(!blogToDelete) {
        return response.status(400).json({ error: 'blog has been already deleted' })
    }

    if(blogToDelete?.user.toString() !== request.user.id.toString()){
        return response.status(401).json({ error: 'blog can be deleted only by the owner' })
    }

    const user = await User.findById(request.user.id.toString())
    if(!user) return response.status(401).json({ error: 'Invalid or missing user' })

    await Blog.deleteOne({ _id: id })

    response.status(204).send()
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
    const user = await User.findById(request.user.id.toString())
    if(!user) return response.status(401).json({ error: 'Invalid or missing user' })

    const id = request.params.id
    const newBlogInfo = request.body

    const blogToUpdate = await Blog.findById(id)
    const blogOwner = blogToUpdate.user.toJSON()

    const receivedUserId = request.user.id

    if(receivedUserId !== blogOwner) {
        return response.status(401).json({ error: 'blog can be updated only by the owner' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogInfo, { new: true, runValidators: true, context: 'query' }).populate('user')

    response.status(200).json(updatedBlog)
})


module.exports = blogRouter