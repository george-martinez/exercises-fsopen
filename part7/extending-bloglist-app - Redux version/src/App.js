import './App.css'
import { useEffect, useRef } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogDetail from './components/BlogDetail'
import Menu from './components/Menu'
import UserDetails from './components/UserDetails'
import UserList from './components/UserList'
import Main from './components/Main'

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

	return (
		<div>
			<Menu userLogged={userLogged} />

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
