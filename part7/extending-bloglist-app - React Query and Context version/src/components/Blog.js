import { BlogContainer, LinkStyled } from './StyledComponents'

const Blog = ({ blog }) => {
	return (
		<BlogContainer>
			<p>
				<LinkStyled to={`/blogs/${blog?.id}`}>
					{blog?.title} - by: {blog?.author}
				</LinkStyled>
			</p>
		</BlogContainer>
	)
}

export default Blog
