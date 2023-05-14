import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { removeUserBlog } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, blogs }) => {
	let { id, title, likes, author } = blog

	const [showComponent, setShowComponent] = useState(false)

	const notificationDuration = 5

	const dispatch = useDispatch()

	return (
		<div>
			<div className='blog'>
				<p>
					<Link to={`/blogs/${blog?.id}`}>
						{blog?.title} - by: {blog?.author}
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Blog
