const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const userExtractor = require('../utils/middleware').userExtractor

const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')

    response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
    if(!request.body) return response.status(400).end()

    const { title, author, url, likes, userId } = request.body

    if(!userId) return response.status(400).json({ error: 'request must contain userId field' })

    const user = await User.findById(request.user.id)

    if(!user) return response.status(400).json({ error: 'Invalid or missing id' })

    const blogToAdd = new Blog({
        title,
        author,
        url,
        likes,
        user: userId
    })

    const addedBlog = await blogToAdd.save()

    user.blogs = user.blogs.concat(addedBlog._id)

    await user.save()

    response.status(201).json(addedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    if(!request.params) return response.status(400).end()

    const id = request.params.id

    const blogToDelete = await Blog.findById(id)

    if(blogToDelete.user.toString() !== request.user.id.toString()){
        return response.status(401).json({ error: 'blog can be deleted only by the owner' })
    }

    await Blog.deleteOne({ id: id })

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    if(!request.params) return response.status(400).end()
    if(!request.body) return response.status(400).end()

    const id = request.params.id
    const blogToUpdate = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, { new: true, runValidators: true, context: 'query' })

    response.status(200).json(updatedBlog)
})


module.exports = blogRouter