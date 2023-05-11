import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	notification: null,
	timerId: null,
}

const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		newNotification(state, action) {
			const notificationObject = action.payload
			return { ...notificationObject }
		},
		clearNotifications(state, action) {
			return initialState
		},
		getNotification(state, action) {
			return state
		},
	},
})

export const { newNotification, clearNotifications, getNotification } =
	notificationSlice.actions

export const createNotification = (notification, timeInSeconds) => {
	return async dispatch => {
		const timerId = setTimeout(() => {
			dispatch(clearNotifications(timerId))
		}, timeInSeconds * 1000)

		dispatch(newNotification({ notification, timerId }))
	}
}

export default notificationSlice.reducer
