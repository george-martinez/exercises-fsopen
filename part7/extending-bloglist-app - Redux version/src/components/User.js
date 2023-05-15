import { Link } from 'react-router-dom'

const User = ({ user }) => {
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td></td>
						<td>
							<strong>Blogs created</strong>
						</td>
					</tr>
					<tr>
						<td>
							<Link to={`/users/${user.id}`}>
								{user?.username}
							</Link>
						</td>
						<td>{user.blogs.length}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default User
