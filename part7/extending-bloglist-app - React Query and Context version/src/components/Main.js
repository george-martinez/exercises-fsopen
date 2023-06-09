import LoginForm from './LoginForm'
import BlogList from './BlogList'
import ToggableForm from './ToggableForm'

const Main = ({ userIsLoggedIn, setUserIsLoggedIn, blogFormRef, blogs }) => {
	return (
		<div>
			{!userIsLoggedIn ? (
				<LoginForm setUserIsLoggedIn={setUserIsLoggedIn} />
			) : (
				<ToggableForm blogFormRef={blogFormRef} />
			)}
			<BlogList blogs={blogs} />
		</div>
	)
}

export default Main
