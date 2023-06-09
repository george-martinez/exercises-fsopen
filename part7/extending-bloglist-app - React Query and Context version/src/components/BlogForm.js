import { useState } from 'react'
import { Button } from './StyledComponents'
import { useMutation, useQueryClient } from 'react-query'
import blogsFn from '../services/blogs'
import getUsersFn from '../services/user'
import {
	useNotificationDispatch,
	useNotificationValue,
} from '../context/NotificationContext'

const BlogForm = ({ blogFormRef }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const notificationDuration = 5

	const notificationDispatch = useNotificationDispatch()

	const queryClient = useQueryClient()

	const addBlogMutation = useMutation(blogsFn.create, {
		onSuccess: () => {
			queryClient.invalidateQueries('blogs')
		},
	})

	const refetchUserBlogsMutation = useMutation(getUsersFn.getUsers, {
		onSuccess: () => {
			queryClient.invalidateQueries('users')
		},
	})

	const handleAddBlog = async event => {
		event.preventDefault()

		const newBlog = {
			title,
			author,
			url,
		}

		try {
			addBlogMutation.mutate(newBlog)
			refetchUserBlogsMutation.mutate()

			notificationDispatch({
				type: 'newNotification',
				payload: {
					notification: `A new blog ${title} by ${author} has been added`,
					notificationDuration,
				},
			})

			setTitle('')
			setAuthor('')
			setUrl('')
			blogFormRef.current.toggleVisibility()
		} catch (error) {
			const message = error.response.data.error
			console.error(error)

			notificationDispatch({
				type: 'newNotification',
				payload: {
					notification: `Error: ${message}`,
					notificationDuration,
				},
			})
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
