import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button } from './StyledComponents'

const BlogForm = ({ blogFormRef }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const notificationDuration = 5
	const dispatch = useDispatch()

	const handleAddBlog = async event => {
		event.preventDefault()

		const newBlog = {
			title,
			author,
			url,
		}

		try {
			await dispatch(createBlog(newBlog))

			dispatch(
				createNotification(
					`A new blog ${title} by ${author} has been added`,
					notificationDuration
				)
			)

			setTitle('')
			setAuthor('')
			setUrl('')
			blogFormRef.current.toggleVisibility()
		} catch (error) {
			const message = error.response.data.error
			console.error(error)

			dispatch(
				createNotification(`Error: ${message}`, notificationDuration)
			)
		}
	}

	return (
		<div>
			<form onSubmit={handleAddBlog}>
				<p>Create a new blog:</p>
				<p>
					title:
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
						id='new-blog-form-title'
					/>
				</p>
				<p>
					author:
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
						id='new-blog-form-author'
					/>
				</p>
				<p>
					url:
					<input
						value={url}
						onChange={({ target }) => setUrl(target.value)}
						id='new-blog-form-url'
					/>
				</p>
				<Button
					$primary
					type='submit'
					id='new-blog-form-create-button'
					className='menu-btn'
				>
					create
				</Button>
			</form>
		</div>
	)
}

export default BlogForm
