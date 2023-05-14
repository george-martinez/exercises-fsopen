import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { removeUserBlog } from '../reducers/userReducer'
const notificationDuration = 5

const BlogDetail = ({ blog }) => {
	console.log('🚀 ~ file: BlogDetail.js:8 ~ BlogDetail ~ blog:', blog)
	const dispatch = useDispatch()

	if (!blog) {
		return null
	}

	let { id, title, likes, author } = blog

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
			await dispatch(removeUserBlog(blog))
		} catch (error) {
			const message = error.message
			console.error(error)

			dispatch(
				createNotification(`Error: ${message}`, notificationDuration)
			)
		}
	}

	return (
		<div className='expanded-blog'>
			<p>Title: {blog.title} </p>
			<p>URL: {blog.url}</p>
			<p>
				Likes: {likes}{' '}
				<button onClick={() => handleAddLike()}>like</button>
			</p>
			<p>Author: {blog.author}</p>
			<button onClick={() => handleDelete()}>remove blog</button>
		</div>
	)
}

export default BlogDetail
