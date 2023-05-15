import LoginForm from './LoginForm'
import BlogList from './BlogList'
import ToggableForm from './ToggableForm'

const Main = ({ user, blogFormRef, blogs }) => {
	return (
		<div>
			{user === null ? (
				<LoginForm />
			) : (
				<ToggableForm blogFormRef={blogFormRef} />
			)}
			<BlogList blogs={blogs} />
		</div>
	)
}

export default Main
