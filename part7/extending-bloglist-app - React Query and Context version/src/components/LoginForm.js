import { useState } from 'react'
import { Button } from './StyledComponents'
import { useLoginDispatch } from '../context/LoginContext'
import { useNotificationDispatch } from '../context/NotificationContext'
import { login } from '../services/login'

const LoginForm = ({ setUserIsLoggedIn }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const loginDispatch = useLoginDispatch()
	const notificationDuration = 5

	const notificationDispatch = useNotificationDispatch()

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const loggedAt = JSON.stringify(new Date())

			const loggedUser = await login({
				username,
				password,
			})

			loginDispatch({
				type: 'loginUser',
				payload: { ...loggedUser, loggedAt },
			})

			setUserIsLoggedIn(true)

			setUsername('')
			setPassword('')
		} catch (error) {
			notificationDispatch({
				type: 'newNotification',
				payload: {
					notification: `Wrong credentials`,
					notificationDuration,
				},
			})
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
				<Button $primary type='submit' id='login-button'>
					login
				</Button>
			</form>
		</div>
	)
}

export default LoginForm
