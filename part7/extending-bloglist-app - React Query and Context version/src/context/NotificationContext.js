import { createContext, useContext, useReducer } from 'react'
import notificationReducer from '../reducers/notificationReducer'
import { setInitialState } from '../reducers/notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		setInitialState()
	)

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const notificationValueAndDispatch = useContext(NotificationContext)
	return notificationValueAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationValueAndDispatch = useContext(NotificationContext)
	return notificationValueAndDispatch[1]
}

export default NotificationContext
