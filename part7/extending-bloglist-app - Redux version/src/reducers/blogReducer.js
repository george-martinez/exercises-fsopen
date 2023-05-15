import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { updateUserBlogs } from './userReducer'

const initialState = []

const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		newBlog(state, action) {
			const createdBlog = action.payload
			return [...state, createdBlog]
		},
		quitBlog(state, action) {
			const id = action.payload

			return state.filter(blog => blog.id !== id)
		},
		newLike(state, action) {
			const id = action.payload

			const blogToChange = state.find(blog => blog.id === id)
			const changedBlog = {
				...blogToChange,
				likes: blogToChange.likes + 1,
			}

			return state.map(blog => (blog.id !== id ? blog : changedBlog))
		},
		setBlogs(state, action) {
			return action.payload
		},
		newComment(state, action) {
			const { comment, id } = action.payload

			const blogToChange = state.find(blog => blog.id === id)
			const changedBlog = {
				...blogToChange,
				comments: blogToChange.comments.concat(comment),
			}

			return state.map(blog => (blog.id !== id ? blog : changedBlog))
		},
	},
})

export const { newBlog, quitBlog, setBlogs, newLike, newComment } =
	blogSlice.actions

export const createBlog = blog => {
	return async dispatch => {
		const createdBlog = await blogService.create(blog)
		dispatch(newBlog(createdBlog))
		dispatch(updateUserBlogs(createdBlog))
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const likeBlog = id => {
	return async dispatch => {
		const blogToUpdate = await blogService.getBlog(id)
		blogToUpdate.likes += 1

		const updatedBlog = await blogService.update(id, blogToUpdate)

		dispatch(newLike(updatedBlog.id))
	}
}

export const removeBlog = id => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch(quitBlog(id))
	}
}

export const commentBlog = (id, comment) => {
	return async dispatch => {
		await blogService.addComment(id, comment)
		dispatch(newComment({ id, comment }))
	}
}

export default blogSlice.reducer
