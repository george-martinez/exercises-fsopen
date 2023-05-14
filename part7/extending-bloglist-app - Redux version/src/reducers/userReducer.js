import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const initialState = []

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
		setUserBlogs(state, action) {
			const createdBlog = action.payload
			const users = state.map(user => {
				if (user.id === createdBlog.user) {
					return { ...user, blogs: user.blogs.concat(createdBlog) }
				}
				return user
			})
			return users
		},
		delUserBlogs(state, action) {
			const blogToDelete = action.payload
			const newUserArr = state.map(user => {
				if (user.id === blogToDelete.user) {
					return {
						...user,
						blogs: user.blogs.filter(
							blog => blog.id !== blogToDelete.id
						),
					}
				}
				return user
			})

			return newUserArr
		},
	},
})

export const { setUsers, setUserBlogs, delUserBlogs } = userSlice.actions

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getUsers()
		dispatch(setUsers(users))
	}
}

export const updateUserBlogs = createdBlog => {
	return async dispatch => {
		dispatch(setUserBlogs(createdBlog))
	}
}

export const removeUserBlog = blog => {
	return async dispatch => {
		dispatch(delUserBlogs(blog))
	}
}

export default userSlice.reducer
