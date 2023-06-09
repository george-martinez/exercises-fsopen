import blogService from '../services/blogs'

const blogReducer = async (state, action) => {
	switch (action.type) {
		case 'newBlog': {
			const blog = action.payload
			const createdBlog = await blogService.create(blog)
			return [...state, createdBlog]
		}
		case 'removeBlog': {
			const id = action.payload
			await blogService.remove(id)
			return state.filter(blog => blog.id !== id)
		}
		case 'newLike': {
			const id = action.payload
			const blogToUpdate = await blogService.getBlog(id)
			blogToUpdate.likes += 1
			await blogService.update(id, blogToUpdate)

			const blogToChange = state.find(blog => blog.id === id)
			const changedBlog = {
				...blogToChange,
				likes: blogToChange.likes + 1,
			}
			return state.map(blog => (blog.id !== id ? blog : changedBlog))
		}
		case 'setBlogs': {
			const blogs = await blogService.getAll()
			return blogs
		}
		case 'newComment': {
			const { comment, id } = action.payload
			await blogService.addComment(id, comment)
			const blogToChange = state.find(blog => blog.id === id)
			const changedBlog = {
				...blogToChange,
				comments: blogToChange.comments.concat(comment),
			}
			return state.map(blog => (blog.id !== id ? blog : changedBlog))
		}
		default:
			return state
	}
}

export default blogReducer
