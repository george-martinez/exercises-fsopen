export const setInitialState = () => {
	return {
		notification: null,
		timerId: null,
		notificationDuration: null,
	}
}

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'newNotification':
			const { notification, notificationDuration } = action.payload
			return { notification, notificationDuration, timerId: null }
		case 'clearNotifications':
			return setInitialState()
		case 'getNotification':
			return state
		case 'setTimerId':
			const { timerId } = action.payload
			return { ...state, timerId }
		default:
			return state
	}
}

export default notificationReducer
