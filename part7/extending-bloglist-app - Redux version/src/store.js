import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blog: blogReducer,
		user: userReducer,
	},
})

export default store
