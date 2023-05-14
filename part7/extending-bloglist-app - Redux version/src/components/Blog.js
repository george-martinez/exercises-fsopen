import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, blogs }) => {
	let { id, title, likes, author } = blog

	const [showComponent, setShowComponent] = useState(false)

	const notificationDuration = 5

	const dispatch = useDispatch()

	const toggleView = () => {
		setShowComponent(!showComponent)
	}

	const handleAddLike = async () => {
		try {
			await dispatch(likeBlog(id))
		} catch (error) {
			const message = error.message
			console.error(error)
			dispatch(
				createNotification(`Error: ${message}`, notificationDuration)
			)
		}
	}

	const handleDelete = async () => {
		if (!window.confirm(`Remove blog ${title} by ${author}`)) return null

		try {
			await dispatch(removeBlog(id))
		} catch (error) {
			const message = error.message
			console.error(error)

			dispatch(
				createNotification(`Error: ${message}`, notificationDuration)
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
