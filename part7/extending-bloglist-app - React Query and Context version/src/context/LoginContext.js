import { createContext, useContext, useReducer } from 'react'
import loginReducer from '../reducers/loginReducer'
import { setInitialState } from '../reducers/loginReducer'
const LoginContext = createContext()

export const LoginContextProvider = props => {
	const [login, loginDispatch] = useReducer(loginReducer, setInitialState())

	return (
		<LoginContext.Provider value={[login, loginDispatch]}>
			{props.children}
		</LoginContext.Provider>
	)
}

export const useLoginValue = () => {
	const loginValueAndDispatch = useContext(LoginContext)
	return loginValueAndDispatch[0]
}

export const useLoginDispatch = () => {
	const loginValueAndDispatch = useContext(LoginContext)
	return loginValueAndDispatch[1]
}

export default LoginContext
