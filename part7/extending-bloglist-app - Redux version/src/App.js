import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()

	const notificationMessage = useSelector(
		state => state.notification.notification
	)

	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	const blogs = useSelector(state => state.blog)

	const blogFormRef = useRef()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<div>
			{user === null ? null : (
				<p>
					{user.username} is logged in {'=>'}{' '}
					<button onClick={() => handleLogout()}>logout</button>
				</p>
			)}

			{notificationMessage !== null ? <Notification /> : null}

			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<Togglable buttonLabel='New Blog' ref={blogFormRef}>
						<BlogForm blogFormRef={blogFormRef} />
					</Togglable>
				</div>
			)}

			<h2>Blogs</h2>
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<Blog key={blog.id} blog={blog} blogs={blogs} />
				))}
		</div>
	)
}

export default App
