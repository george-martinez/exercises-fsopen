import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const Menu = ({ userLogged }) => {
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<div>
			<Link to={'/'}>Blogs </Link>
			<Link to={'/users'}>Users </Link>
			{userLogged ? (
				<p>
					{userLogged.username} is logged in {'=>'}{' '}
					<button onClick={() => handleLogout()}>logout</button>
				</p>
			) : (
				<Link to={'/'}>Login</Link>
			)}
		</div>
	)
}

export default Menu
