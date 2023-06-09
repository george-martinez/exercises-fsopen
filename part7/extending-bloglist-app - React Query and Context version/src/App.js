import './App.css'
import { useRef, useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Notification from './components/Notification'
import BlogDetail from './components/BlogDetail'
import Menu from './components/Menu'
import UserDetails from './components/UserDetails'
import UserList from './components/UserList'
import Main from './components/Main'
import { useQuery } from 'react-query'
import blogsFn from './services/blogs'
import getUsersFn from './services/user'
import { setInitialState } from './reducers/loginReducer'

const App = () => {
	const [userIsLoggedIn, setUserIsLoggedIn] = useState(
		setInitialState().isLoggedIn
	)

	let users = []
	let blogs = []

	const blogQuery = useQuery('blogs', blogsFn.getAll, {
		refetchOnWindowFocus: false,
		retry: 1,
	})

	const userQuery = useQuery('users', getUsersFn.getUsers, {
		refetchOnWindowFocus: false,
		retry: 1,
	})

	blogs = blogQuery.data
	users = userQuery.data

	const userMatch = useMatch('/users/:id')
	const userMatched = userMatch
		? users.find(u => u.id === userMatch.params.id)
		: null

	const blogMatch = useMatch('/blogs/:id')
	const blogMatched = blogMatch
		? blogs.find(b => b.id === blogMatch.params.id)
		: null

	const blogFormRef = useRef()

	if (userQuery.isLoading || blogQuery.isLoading) {
		return <div>loading data from server...</div>
	}

	return (
		<div>
			<Menu
				userIsLoggedIn={userIsLoggedIn}
				setUserIsLoggedIn={setUserIsLoggedIn}
			/>

			<Notification />

			<Routes>
				<Route
					exact
					path='/'
					element={
						<Main
							userIsLoggedIn={userIsLoggedIn}
							setUserIsLoggedIn={setUserIsLoggedIn}
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
