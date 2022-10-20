import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { create } from '../services/blogs'

jest.mock('../services/blogs', () => ({ create: jest.fn() }))

test('check that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const setBlogs = jest.fn()
    const setNotificationMessage = jest.fn(msg => console.log(msg))
    const user = userEvent.setup()
    create.mockImplementation((blog) => {
        blog.likes = 0
        blog.id = 1

        return Promise.resolve(blog)
    })

    const blog = {
        id: 1,
        title: 'New blog title 1',
        author: 'George',
        url: 'www.test.com',
        likes: 0
    }

    const blogs = [blog]

    render(
        <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
        />
    )

    const inputs = await screen.getAllByRole('textbox')
    const createButton = await screen.findByText('create')

    await user.type(inputs[0], blog.title)
    await user.type(inputs[1], blog.author)
    await user.type(inputs[2], blog.url)
    await user.click(createButton)

    expect(create.mock.calls).toHaveLength(1)
    expect(blog).toStrictEqual(create.mock.calls[0][0])
})