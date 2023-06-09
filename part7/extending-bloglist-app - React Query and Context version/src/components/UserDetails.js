const UserDetails = ({ user }) => {
	if (!user) {
		return null
	}

	return (
		<div>
			<h2>{user.username}</h2>

			<h3>Added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}

export default UserDetails
