import { createContext, useContext, useReducer } from 'react'
import blogReducer from '../reducers/blogReducer'

const BlogContext = createContext()

export const BlogContextProvider = props => {
	const [blogs, blogsDispatch] = useReducer(blogReducer, [])

	return (
		<BlogContext.Provider value={[blogs, blogsDispatch]}>
			{props.children}
		</BlogContext.Provider>
	)
}

export const useBlogValue = () => {
	const blogValueAndDispatch = useContext(BlogContext)
	return blogValueAndDispatch[0]
}

export const useBlogDispatch = () => {
	const blogValueAndDispatch = useContext(BlogContext)
	return blogValueAndDispatch[1]
}

export default BlogContext
