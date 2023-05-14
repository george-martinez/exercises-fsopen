import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleLogin = async event => {
		event.preventDefault()

		console.log('loggin in with', username, password)

		try {
			await dispatch(loginUser(username, password))
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(createNotification('Wrong credentials', 5))
		}
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin} id='login-form'>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						id='username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						id='password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit' id='login-button'>
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
