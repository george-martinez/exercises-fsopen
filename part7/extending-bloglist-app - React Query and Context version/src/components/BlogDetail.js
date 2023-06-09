import { useField } from '../hooks/useField'
import { Button, Input, BlogContainer, FormOneField } from './StyledComponents'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import blogsFn from '../services/blogs'
import getUsersFn from '../services/user'
import { useNotificationDispatch } from '../context/NotificationContext'
const notificationDuration = 5

const BlogDetail = ({ blog }) => {
	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()

	const addLikeToBlogMutation = useMutation(blogsFn.update, {
		onSuccess: () => {
			queryClient.invalidateQueries('blogs')
		},
	})
	const deleteBlogMutation = useMutation(blogsFn.remove, {
		onSuccess: deletedBlog => {
			queryClient.invalidateQueries('blogs')
			const users = queryClient.getQueryData('users')
			const usersWithBlogFiltered = users.map(user => {
				const newUserBlogs = user.blogs.filter(
					b => b.id !== deletedBlog.id
				)

				return {
					...user,
					blogs: newUserBlogs,
				}
			})
			//another option is -> queryClient.invalidateQueries('users')
			queryClient.setQueryData('users', usersWithBlogFiltered)
		},
	})
	const addCommentToBlogMutation = useMutation(blogsFn.addComment, {
		onSuccess: () => {
			queryClient.invalidateQueries('blogs')
		},
	})
	const refetchUserBlogsMutation = useMutation(getUsersFn.getUsers, {
		onSuccess: () => {
			queryClient.invalidateQueries('users')
		},
	})

	const navigate = useNavigate()

	const [comment, commentReset] = useField('text')

	if (!blog) {
		return null
	}

	let { id, title, likes, author } = blog

	const handleAddLike = async () => {
		try {
			await addLikeToBlogMutation.mutate({
				...blog,
				likes: blog.likes + 1,
			})
			await refetchUserBlogsMutation.mutate()
		} catch (error) {
			const message = error.message
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

	const handleDelete = async () => {
		if (!window.confirm(`Remove blog ${title} by ${author}`)) return null

		try {
			await deleteBlogMutation.mutate(id)
			navigate('/')
		} catch (error) {
			const message = error.message
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

	const handleAddComment = async event => {
		event.preventDefault()

		await addCommentToBlogMutation.mutate({
			...blog,
			comments: blog.comments.concat(comment.value),
		})
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
