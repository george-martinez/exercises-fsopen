import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { update } from '../services/blogs'

jest.mock('../services/blogs', () => ({ update: jest.fn() }))

test('renders content', async () => {
    const setBlogs = jest.fn()
    const setNotificationMessage = jest.fn()

    const blogs = new Array(0)
    const blog = {
        title: 'New blog title 1',
        author: 'George',
        url: 'www.test.com'
    }

    let container = render(
        <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
        />
    ).container

    const element = await screen.findByText('Title: New blog title 1 - by: George')

    expect(element).toBeDefined()

    const div = container.querySelector('.expanded-blog')

    expect(div).toBeNull()
})

test('url and likes are displayed when the button controlling the shown details has been clicked', async () => {
    const setBlogs = jest.fn()
    const setNotificationMessage = jest.fn()
    const user = userEvent.setup()

    const blogs = new Array(0)
    const blog = {
        title: 'New blog title 1',
        author: 'George',
        url: 'www.test.com'
    }

    let container = render(
        <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
        />
    ).container

    const viewButton = await screen.getByText('view')

    await user.click(viewButton)

    const div = container.querySelector('.expanded-blog')
    expect(div).not.toBeNull()
    expect(div).toHaveTextContent(
        'www.test.com'
    )
    expect(div).toHaveTextContent(
        'Likes:'
    )
})

test('if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
    const setBlogs = jest.fn()
    const setNotificationMessage = jest.fn()
    const user = userEvent.setup()
    update.mockImplementation((blog) => {
        return Promise.resolve(blog)
    })

    const blog = {
        id: 1,
        title: 'New blog title 1',
        author: 'George',
        url: 'www.test.com',
        likes: 0
    }

    const blogs = new Array(blog)

    render(
        <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
        />
    )

    const viewButton = await screen.getByText('view')
    await user.click(viewButton)

    const likeButton = await screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(setBlogs.mock.calls).toHaveLength(2)
})


