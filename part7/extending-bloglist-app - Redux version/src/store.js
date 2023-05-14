import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blog: blogReducer,
		login: loginReducer,
		users: userReducer,
	},
})

export default store
