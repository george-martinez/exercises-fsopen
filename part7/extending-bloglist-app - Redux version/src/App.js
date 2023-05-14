import './App.css'
import { useEffect, useRef } from 'react'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logoutUser } from './reducers/loginReducer'
import BlogDetail from './components/BlogDetail'

const BlogList = ({ blogs }) => {
	const blogsCopy = [...blogs]

	return (
		<div>
			<h2>Blogs</h2>
			{blogsCopy
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<Blog key={blog.id} blog={blog} blogs={blogs} />
				))}
		</div>
	)
}

const ToggableForm = ({ blogFormRef }) => {
	return (
		<div>
			<Toggable buttonLabel='New Blog' ref={blogFormRef}>
				<BlogForm blogFormRef={blogFormRef} />
			</Toggable>
		</div>
	)
}

const UserDetails = ({ user }) => {
	if (!user) {
		return null
	}

	return (
		<div>
			<h2>{user.username}</h2>

			<h3>Added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}

const User = ({ user }) => {
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td></td>
						<td>
							<strong>Blogs created</strong>
						</td>
					</tr>
					<tr>
						<td>
							<Link to={`/users/${user.id}`}>
								{user?.username}
							</Link>
						</td>
						<td>{user.blogs.length}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

const UserList = ({ users }) => {
	return (
		<div>
			<h2>Names</h2>
			{users.map(user => (
				<User key={user?.id} user={user} />
			))}
		</div>
	)
}

const Menu = ({ userLogged }) => {
	return (
		<div>
			<Link to={'/'}>Blogs </Link>
			<Link to={'/users'}>Users </Link>
			{userLogged ? null : <Link to={'/'}>Login</Link>}
		</div>
	)
}

const Main = ({ user, blogFormRef, blogs }) => {
	return (
		<div>
			{user === null ? (
				<LoginForm />
			) : (
				<ToggableForm blogFormRef={blogFormRef} />
			)}
			<BlogList blogs={blogs} />
		</div>
	)
}

const App = () => {
	const dispatch = useDispatch()

	const notificationMessage = useSelector(
		state => state.notification.notification
	)

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	const users = useSelector(state => state.users)

	const userLogged = useSelector(state => state.login)

	const userMatch = useMatch('/users/:id')
	const userMatched = userMatch
		? users.find(u => u.id === userMatch.params.id)
		: null

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	const blogs = useSelector(state => state.blog)

	const blogMatch = useMatch('/blogs/:id')
	const blogMatched = blogMatch
		? blogs.find(b => b.id === blogMatch.params.id)
		: null

	const blogFormRef = useRef()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<div>
			<Menu userLogged={userLogged} />

			{userLogged === null ? null : (
				<p>
					{userLogged.username} is logged in {'=>'}{' '}
					<button onClick={() => handleLogout()}>logout</button>
				</p>
			)}

			{notificationMessage !== null ? <Notification /> : null}

			<Routes>
				<Route
					path='/'
					element={
						<Main
							user={userLogged}
							blogFormRef={blogFormRef}
							blogs={blogs}
						/>
					}
				/>
				<Route path='/users' element={<UserList users={users} />} />
				<Route
					path='/users/:id'
					element={<UserDetails user={userMatched} />}
				/>
				<Route
					path='/blogs/:id'
					element={<BlogDetail blog={blogMatched} />}
				/>
			</Routes>
		</div>
	)
}

export default App
