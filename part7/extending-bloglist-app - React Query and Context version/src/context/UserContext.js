import { createContext, useContext, useReducer } from 'react'
import userReducer from '../reducers/userReducer'

const UserContext = createContext()

export const UserContextProvider = props => {
	const [users, usersDispatch] = useReducer(userReducer, [])

	return (
		<UserContext.Provider value={[users, usersDispatch]}>
			{props.children}
		</UserContext.Provider>
	)
}

export const useUserValue = () => {
	const userValueAndDispatch = useContext(UserContext)
	return userValueAndDispatch[0]
}

export const useUserDispatch = () => {
	const userValueAndDispatch = useContext(UserContext)
	return userValueAndDispatch[1]
}

export default UserContext
