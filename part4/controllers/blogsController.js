const Blog = require('../models/blogModel')

const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    if(!request.body) return response.status(400).end()

    const blogToAdd = request.body

    const addedBlog = new Blog(blogToAdd)

    const result = await addedBlog.save()

    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    if(!request.params) return response.status(400).end()

    const id = request.params.id

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