const { connectDB, closeDB } = require('../mongo')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blogModel')
const helper = require('../utils/blogs_helper')

const api = supertest(app)

beforeAll(async () => {
    await closeDB()
    await connectDB()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


describe('GET /api/blogs', () => {
    test('all notes are returned', async () => {
        const blogsResponse = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(blogsResponse.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('POST /api/blogs', () => {
    test('blog property id is defined', async () => {
        const blogs = await helper.blogsInDb()

        expect(blogs[0].id).toBeDefined()
    })

    test('blog is correctly added', async () => {
        const blogToAdd = helper.listWithOneBlog[0]

        const addedBlogResponse = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()

        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
        expect(addedBlogResponse.body.title).toContain(blogToAdd.title)
    })

    test('if likes property is missing, default value is zero', async () => {
        const blogToAdd = helper.listWithOneBlog[0]
        delete blogToAdd.likes

        const addedBlogResponse = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(addedBlogResponse.body.likes).toBeDefined()
    })

    test('if title or url property are missing, server returns BadRequest', async () => {
        const blogToAdd1 = helper.listWithOneBlog[0]
        delete blogToAdd1.title

        const blogToAdd2 = helper.listWithOneBlog[0]
        delete blogToAdd2.url

        await api
            .post('/api/blogs')
            .send(blogToAdd1)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        await api
            .post('/api/blogs')
            .send(blogToAdd2)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('DELETE /api/blogs', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        await api
            .delete(`/api/blogs/${helper.initialBlogs[0].id}`)
            .expect(204)

        const blogs = await helper.blogsInDb()

        expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
        expect(blogs).not.toContain(helper.initialBlogs[0].title)
    })
})

describe('PUT /api/blogs', () => {
    test('succeeds with status code 200 and updates a blog correctly', async () => {
        const initialBlogs = await helper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        const newLikes = 1272
        blogToUpdate.likes = newLikes

        const updatedBlogResponse = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        expect(updatedBlogResponse.body.likes).toBe(newLikes)
    })

    test('throws Bad Request if title are null', async () => {
        const initialBlogs = await helper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        blogToUpdate.title = null

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('throws Bad Request if url are null', async () => {
        const initialBlogs = await helper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        blogToUpdate.url = null

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})


afterAll(async () => {
    await closeDB()
})