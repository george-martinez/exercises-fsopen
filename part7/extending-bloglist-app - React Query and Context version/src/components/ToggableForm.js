import Toggable from './Toggable'
import BlogForm from './BlogForm'

const ToggableForm = ({ blogFormRef }) => {
	return (
		<div>
			<Toggable buttonLabel='New Blog' ref={blogFormRef}>
				<BlogForm blogFormRef={blogFormRef} />
			</Toggable>
		</div>
	)
}

export default ToggableForm
