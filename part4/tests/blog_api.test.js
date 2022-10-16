const { connectDB, closeDB } = require('../mongo')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blogModel')
const blogsHelper = require('../utils/blogs_helper')
const userHelper = require('../utils/users_helper')
const User = require('../models/userModel')

const api = supertest(app)

let BEARER_TOKEN = ''

beforeAll(async () => {
    await closeDB()
    await connectDB()
})

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    await api
        .post('/api/users')
        .send(userHelper.initialUsers[0])

    await api
        .post('/api/users')
        .send(userHelper.initialUsers[1])

    const users = await userHelper.usersInDb()
    const userId = users[0].id

    const initialBlogs = blogsHelper.initialBlogs.map(blog => {
        blog.user = userId
        return blog
    })

    await Blog.insertMany(initialBlogs)

    const loginResponse = await api
        .post('/api/login')
        .send(userHelper.initialUsers[0])


    BEARER_TOKEN = loginResponse.body.token
})


describe('GET /api/blogs', () => {
    test('all notes are returned', async () => {
        const blogsResponse = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(blogsResponse.body).toHaveLength(blogsHelper.initialBlogs.length)
    })
})

describe('POST /api/blogs', () => {
    test('blog property id is defined', async () => {
        const blogs = await blogsHelper.blogsInDb()

        expect(blogs[0].id).toBeDefined()
    })

    test('blog is correctly added', async () => {
        const blogToAdd = blogsHelper.listWithOneBlog[0]
        const users = await userHelper.usersInDb()
        const userId = users[0].id

        blogToAdd.userId = userId

        const addedBlogResponse = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await blogsHelper.blogsInDb()

        expect(blogs).toHaveLength(blogsHelper.initialBlogs.length + 1)
        expect(addedBlogResponse.body.title).toContain(blogToAdd.title)
    })

    test('if likes property is missing, default value is zero', async () => {
        const blogToAdd = blogsHelper.listWithOneBlog[0]
        delete blogToAdd.likes

        const users = await userHelper.usersInDb()

        const userId = users[0].id

        blogToAdd.userId = userId

        const addedBlogResponse = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        expect(addedBlogResponse.body.likes).toBeDefined()
    })

    test('if title or url property are missing, server returns BadRequest', async () => {
        const users = await userHelper.usersInDb()
        const userId = users[0].id

        const blogToAdd1 = JSON.parse(JSON.stringify(blogsHelper.listWithOneBlog[0]))
        delete blogToAdd1.title
        blogToAdd1.userId = userId

        const blogToAdd2 = JSON.parse(JSON.stringify(blogsHelper.listWithOneBlog[0]))
        delete blogToAdd2.url
        blogToAdd2.userId = userId

        await api
            .post('/api/blogs')
            .send(blogToAdd1)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .send(blogToAdd2)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('DELETE /api/blogs', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()

        await api
            .delete(`/api/blogs/${initialBlogs[0].id}`)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(204)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
        expect(blogsAtEnd).not.toContain(initialBlogs[0].title)
    })
})

describe('PUT /api/blogs', () => {
    test('succeeds with status code 200 and updates a blog correctly', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        const newLikes = 1272
        blogToUpdate.likes = newLikes

        const updatedBlogResponse = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length)
        expect(updatedBlogResponse.body.likes).toBe(newLikes)
    })

    test('throws Bad Request if title are null', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        blogToUpdate.title = null

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('throws Bad Request if url are null', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
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