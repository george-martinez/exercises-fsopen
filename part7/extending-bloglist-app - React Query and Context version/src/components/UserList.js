import User from './User'

const UserList = ({ users }) => {
	return (
		<div>
			<h2>Names</h2>
			{users.map(user => (
				<User key={user?.id} user={user} />
			))}
		</div>
	)
}

export default UserList
