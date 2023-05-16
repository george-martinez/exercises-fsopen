import { LinkStyled } from './StyledComponents'

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
							<LinkStyled to={`/users/${user.id}`}>
								{user?.username}
							</LinkStyled>
						</td>
						<td>{user.blogs.length}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default User
