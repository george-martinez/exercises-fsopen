import userService from '../services/user'

const userReducer = async (state, action) => {
	switch (action.type) {
		case 'setUsers': {
			const users = await userService.getUsers()
			return users
		}
		case 'setUserBlogs': {
			const createdBlog = action.payload
			const users = state.map(user => {
				if (user.id === createdBlog.user) {
					return { ...user, blogs: user.blogs.concat(createdBlog) }
				}
				return user
			})
			return users
		}
		case 'delUserBlogs': {
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
		}
		default:
			return state
	}
}

export default userReducer
