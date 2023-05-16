import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { removeUserBlog } from '../reducers/userReducer'
import { useField } from '../hooks/useField'
import { Button, Input, BlogContainer, FormOneField } from './StyledComponents'
import { useNavigate } from 'react-router-dom'
const notificationDuration = 5

const BlogDetail = ({ blog }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [comment, commentReset] = useField('text')

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
			navigate('/')
		} catch (error) {
			const message = error.message
			console.error(error)

			dispatch(
				createNotification(`Error: ${message}`, notificationDuration)
			)
		}
	}

	const handleAddComment = async event => {
		event.preventDefault()
		await dispatch(commentBlog(id, comment.value))
		commentReset()
		return
	}

	return (
		<div>
			<BlogContainer>
				<p>Title: {blog.title} </p>
				<p>URL: {blog.url}</p>
				<p>
					Likes: {likes}{' '}
					<Button $primary onClick={() => handleAddLike()}>
						like
					</Button>
				</p>
				<p>Author: {blog.author}</p>
				<Button $primary onClick={() => handleDelete()}>
					remove blog
				</Button>
			</BlogContainer>
			<div>
				Comments:
				<FormOneField>
					<Input placeholder='write here' {...comment} />
					<Button $primary onClick={handleAddComment}>
						{' '}
						add a comment
					</Button>
				</FormOneField>
				<ul>
					{blog.comments.length === 0 ? (
						<p>No comments added yet.</p>
					) : (
						blog.comments.map((comment, index) => (
							<li key={index}>{comment}</li>
						))
					)}
				</ul>
			</div>
		</div>
	)
}

export default BlogDetail
