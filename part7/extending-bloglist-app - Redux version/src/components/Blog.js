import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, setBlogs, blogs }) => {
	let { id, title, url, likes, author } = blog
	const { update, remove } = blogService

	const [showComponent, setShowComponent] = useState(false)

	const notificationDuration = 5

	const dispatch = useDispatch()

	const toggleView = () => {
		setShowComponent(!showComponent)
	}

	const handleAddLike = async () => {
		const blogToUpdate = {
			title,
			url,
			author,
			likes: likes + 1,
		}

		try {
			const blogsCopy = [...blogs]
			const index = blogsCopy.findIndex(blogCopy => blogCopy.id === id)
			blogsCopy[index].likes = likes + 1

			setBlogs(blogsCopy)

			await update(id, blogToUpdate)
		} catch (error) {
			console.error(error)
			dispatch(
				createNotification(
					`Error: ${error.message}`,
					notificationDuration
				)
			)
		}
	}

	const handleDelete = async () => {
		if (!window.confirm(`Remove blog ${title} by ${author}`)) return null

		try {
			await remove(id)
			const blogsCopy = blogs.map(arrItem => arrItem)
			const index = blogsCopy.findIndex(blogCopy => blogCopy.id === id)
			blogsCopy.splice(index, 1)
			setBlogs(blogsCopy)
		} catch (error) {
			console.error(error)
			dispatch(
				createNotification(
					`Error: ${error.response.data.error}`,
					notificationDuration
				)
			)
		}
	}

	return (
		<div>
			{showComponent ? (
				<div className='expanded-blog'>
					<p>
						Title: {blog.title}{' '}
						<button onClick={() => toggleView()}>hide</button>
					</p>
					<p>URL: {blog.url}</p>
					<p>
						Likes: {likes}{' '}
						<button onClick={() => handleAddLike()}>like</button>
					</p>
					<p>Author: {blog.author}</p>
					<button onClick={() => handleDelete()}>remove blog</button>
				</div>
			) : (
				<div className='blog'>
					<p>
						Title: {blog.title} - by: {blog.author}{' '}
						<button
							onClick={() => toggleView()}
							className='blog-view-button'
						>
							view
						</button>
					</p>
				</div>
			)}
		</div>
	)
}

export default Blog
