import { Link } from 'react-router-dom'

const Blog = ({ blog, blogs }) => {
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
