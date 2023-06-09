import { Button, ContainerSpacedBetween, LinkStyled } from './StyledComponents'
import { useLoginDispatch, useLoginValue } from '../context/LoginContext'

const Menu = ({ userIsLoggedIn, setUserIsLoggedIn }) => {
	const logoutDispatch = useLoginDispatch()
	const userLogged = useLoginValue()

	const handleLogout = () => {
		logoutDispatch({ type: 'logoutUser', payload: {} })
		setUserIsLoggedIn(false)
	}

	return (
		<ContainerSpacedBetween>
			<div>
				<LinkStyled to={'/'}>Blogs</LinkStyled>
				<LinkStyled to={'/users'}>Users</LinkStyled>
			</div>
			{userIsLoggedIn ? (
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
