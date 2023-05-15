import Blog from './Blog'

const BlogList = ({ blogs }) => {
	const blogsCopy = [...blogs]

	return (
		<div>
			<h2>Blogs</h2>
			{blogsCopy
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<Blog key={blog.id} blog={blog} blogs={blogs} />
				))}
		</div>
	)
}

export default BlogList
