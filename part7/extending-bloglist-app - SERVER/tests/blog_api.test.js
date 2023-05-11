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

    await userHelper.saveUserInDb(userHelper.initialUsers[0])
    await userHelper.saveUserInDb(userHelper.initialUsers[1])

    const { token, user } = await userHelper.loginUser(userHelper.initialUsers[0])
    BEARER_TOKEN = token

    const initialBlogs = blogsHelper.initialBlogs.map(blog => {
        const modifiedBlog = {
            ...blog,
            user: user
        }

        return modifiedBlog
    })

    await Blog.insertMany(initialBlogs)
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

    test('request without a blog in body fails with error 400 bad request', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(initialBlogs).toHaveLength(blogsHelper.initialBlogs.length)
    })

    test('blog is correctly added', async () => {
        const blogToAdd = blogsHelper.listWithOneBlog[0]

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

        const addedBlogResponse = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        expect(addedBlogResponse.body.likes).toBeDefined()
    })

    test('if title or url property are missing, server returns BadRequest', async () => {
        const blogToAdd1 = JSON.parse(JSON.stringify(blogsHelper.listWithOneBlog[0]))
        delete blogToAdd1.title

        const blogToAdd2 = JSON.parse(JSON.stringify(blogsHelper.listWithOneBlog[0]))
        delete blogToAdd2.url

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

    test('returns status code 401 if token is still valid but user has been deleted', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
        const blogToAdd = blogsHelper.listWithOneBlog[0]

        const { token } = await userHelper.loginUser(userHelper.initialUsers[1])
        BEARER_TOKEN = token

        await User.deleteMany({})

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .send(blogToAdd)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('if auth token is not provided server returns status 401 - Unauthorized', async () => {
        const blogToAdd = JSON.parse(JSON.stringify(blogsHelper.listWithOneBlog[0]))

        const response = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('invalid or missing token')
    })

    test('if auth token is invalid server returns status 401 - Unauthorized', async () => {
        const blogToAdd = JSON.parse(JSON.stringify(blogsHelper.listWithOneBlog[0]))

        const response = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .set('Authorization', 'Bearer HiImAnInventedToken')
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('invalid or missing token')
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

    test('returns status code 404 if id is undefined', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()

        await api
            .delete('/api/blogs/')
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(404)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('returns status code 401 if the user trying to delete the blog its not the owner', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()

        const { token } = await userHelper.loginUser(userHelper.initialUsers[1])
        BEARER_TOKEN = token

        await api
            .delete(`/api/blogs/${initialBlogs[0].id}`)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(401)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('returns status code 401 if token is still valid but user has been deleted', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()

        const { token } = await userHelper.loginUser(userHelper.initialUsers[0])
        BEARER_TOKEN = token

        await User.deleteMany({})

        await api
            .delete(`/api/blogs/${initialBlogs[0].id}`)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(401)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('returns status code 400 if blog to delete has already deleted or if id is invalid', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
        const id = 'blogidthathasalreadydeleted'

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(400)

        const blogsAtEnd = await blogsHelper.blogsInDb()
        const blogsAtEndIds = blogsAtEnd.map(blog => blog.id)

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
        expect(blogsAtEndIds).not.toContain(id)
    })

    test('if auth token is not provided server returns status 401 - Unauthorized', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()

        const response = await api
            .delete(`/api/blogs/${initialBlogs[0].id}`)
            .expect(401)

        const blogsAtEnd = await blogsHelper.blogsInDb()
        const blogsAtEndTitles = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
        expect(blogsAtEndTitles).toContain(initialBlogs[0].title)
        expect(response.body.error).toContain('invalid or missing token')
    })

    test('if auth token is invalid server returns status 401 - Unauthorized', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()

        const response = await api
            .delete(`/api/blogs/${initialBlogs[0].id}`)
            .set('Authorization', 'Bearer HiImAnInventedToken2')
            .expect(401)

        const blogsAtEnd = await blogsHelper.blogsInDb()
        const blogsAtEndTitles = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
        expect(blogsAtEndTitles).toContain(initialBlogs[0].title)
        expect(response.body.error).toContain('invalid or missing token')
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
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length)
        expect(updatedBlogResponse.body.likes).toBe(newLikes)
    })

    test('returns status code 401 if token is still valid but user has been deleted', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        const newLikes = 1272
        blogToUpdate.likes = newLikes

        const { token } = await userHelper.loginUser(userHelper.initialUsers[1])
        BEARER_TOKEN = token
        await User.deleteMany({})

        const updatedBlogResponse = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(401)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length)
        expect(updatedBlogResponse.body.error).toContain('Invalid or missing user')
    })

    test('returns status code 401 if the user trying to delete the blog its not the owner', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        const newLikes = 1272
        blogToUpdate.likes = newLikes

        const { token } = await userHelper.loginUser(userHelper.initialUsers[1])
        BEARER_TOKEN = token

        const updatedBlogResponse = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(401)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
        expect(updatedBlogResponse.body.error).toContain('blog can be updated only by the owner')
    })

    test('throws Bad Request if title are null', async () => {
        const initialBlogs = await blogsHelper.blogsInDb()
        const blogToUpdate = initialBlogs[0]
        blogToUpdate.title = null

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
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
            .set('Authorization', `Bearer ${BEARER_TOKEN}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})


afterAll(async () => {
    await closeDB()
})