import blogService from '../services/blogs'
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

export const setInitialState = () => {
	let user = { isLoggedIn: false }
	const loggedUserJSON = window.localStorage.getItem('loggeduseronblogapp')
	if (loggedUserJSON) {
		user = JSON.parse(loggedUserJSON)
		user.isLoggedIn = true
		blogService.setToken(user.token)
		const nowJSON = window.localStorage.getItem('loggedAt')
		if (nowJSON) {
			user.loggedAt = nowJSON
		} else {
			user.loggedAt = JSON.stringify(new Date())
		}
		timerAux(user.loggedAt)
	}

	return { ...user }
}

const loginReducer = async (state, action) => {
	switch (action.type) {
		case 'loginUser': {
			const loggedUser = { ...action.payload }
			window.localStorage.setItem(
				'loggeduseronblogapp',
				JSON.stringify(loggedUser)
			)
			window.localStorage.setItem('loggedAt', loggedUser.loggedAt)
			blogService.setToken(loggedUser.token)

			return { ...loggedUser, isLoggedIn: true }
		}
		case 'logoutUser': {
			window.localStorage.removeItem('loggeduseronblogapp')
			window.localStorage.removeItem('loggedAt')
			blogService.setToken(null)
			return { isLoggedIn: false }
		}
		default:
			return state
	}
}

export default loginReducer
