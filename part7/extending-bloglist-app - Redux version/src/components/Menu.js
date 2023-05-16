import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Button, ContainerSpacedBetween, LinkStyled } from './StyledComponents'

const Menu = ({ userLogged }) => {
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<ContainerSpacedBetween>
			<div>
				<LinkStyled to={'/'}>Blogs</LinkStyled>
				<LinkStyled to={'/users'}>Users</LinkStyled>
			</div>
			{userLogged ? (
				<div>
					{userLogged.username} is logged in {'=>'}{' '}
					<Button $primary onClick={() => handleLogout()}>
						logout
					</Button>
				</div>
			) : (
				<div>
					<LinkStyled to={'/'}>Login</LinkStyled>
				</div>
			)}
		</ContainerSpacedBetween>
	)
}

export default Menu
