import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
const ONE_HOUR = 3600000

const timerAux = loggedAt => {
	const loggedAtDate = new Date(JSON.parse(loggedAt)).getTime()
	const loggedUntil = new Date(loggedAtDate + ONE_HOUR).getTime()
	const now = new Date().getTime()
	let tokenExpired = false

	if (now > loggedUntil) {
		window.localStorage.removeItem('loggeduseronblogapp')
		window.localStorage.removeItem('loggedAt')
		tokenExpired = true
	} else {
		setTimeout(() => {
			window.localStorage.removeItem('loggeduseronblogapp')
			window.localStorage.removeItem('loggedAt')
			tokenExpired = true
		}, loggedUntil - now)
	}

	return tokenExpired
}

const setInitialState = () => {
	let user = null
	const loggedUserJSON = window.localStorage.getItem('loggeduseronblogapp')
	if (loggedUserJSON) {
		user = JSON.parse(loggedUserJSON)
		blogService.setToken(user.token)

		const nowJSON = window.localStorage.getItem('loggedAt')
		if (nowJSON) {
			user.loggedAt = nowJSON
		} else {
			user.loggedAt = JSON.stringify(new Date())
		}
		timerAux(user.loggedAt)
	}
	return user
}

const initialState = setInitialState()

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		saveLoginSession(state, action) {
			return action.payload
		},
		removeLoggedUser(state, action) {
			return null
		},
	},
})

export const { saveLoginSession, removeLoggedUser } = loginSlice.actions

export const loginUser = (username, password) => {
	return async dispatch => {
		const loggedAt = JSON.stringify(new Date())

		const user = await loginService.login({
			username,
			password,
		})

		window.localStorage.setItem('loggeduseronblogapp', JSON.stringify(user))
		window.localStorage.setItem('loggedAt', loggedAt)

		blogService.setToken(user.token)

		dispatch(saveLoginSession({ ...user, loggedAt }))
	}
}

export const logoutUser = () => {
	return dispatch => {
		window.localStorage.removeItem('loggeduseronblogapp')
		window.localStorage.removeItem('loggedAt')
		dispatch(removeLoggedUser())
	}
}

export default loginSlice.reducer
