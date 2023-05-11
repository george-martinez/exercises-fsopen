import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'
import { useSelector } from 'react-redux'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const notificationMessage = useSelector(
		state => state.notification.notification
	)

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem(
			'loggeduseronblogapp'
		)
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogFormRef = useRef()

	const handleLogout = () => {
		window.localStorage.removeItem('loggeduseronblogapp')
		setUser(null)
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
				<LoginForm setUser={setUser} />
			) : (
				<div>
					<Togglable buttonLabel='New Blog' ref={blogFormRef}>
						<BlogForm
							blogs={blogs}
							setBlogs={setBlogs}
							blogFormRef={blogFormRef}
						/>
					</Togglable>
				</div>
			)}

			<h2>Blogs</h2>
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						blogs={blogs}
						setBlogs={setBlogs}
					/>
				))}
		</div>
	)
}

export default App
