import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const Button = styled.button`
	background-color: aquamarine;
	color: rgb(0, 42, 66);
	min-height: 20px;
	&:hover {
		background-color: aquamarine;
		color: rgb(0, 42, 66);
		transform: scale(1.15);
		cursor: pointer;
	}
	${props =>
		props.$primary &&
		css`
			text-decoration: none;
			font-weight: bold;
			border-radius: 5px;
			margin-right: 5px;
			margin-bottom: 5px;
			&:hover {
				background-color: aquamarine;
				color: rgb(0, 42, 66);
				transform: scale(1.15);
				cursor: pointer;
				border-radius: 5px;
			}
		`};
`

export const Input = styled.input`
	color: black;
	margin-left: 5px;
	margin-bottom: 5px;
	width: 150px;
	min-height: 20px;
`

export const LinkStyled = styled(Link)`
	font-weight: bold;
	border-radius: 5px;
	margin-right: 5px;
	margin-bottom: 5px;
	&:hover {
		background-color: aquamarine;
		color: rgb(0, 42, 66);
		transform: scale(1.15);
		cursor: pointer;
		border-radius: 5px;
		padding: 3px;
	}
`

export const BlogContainer = styled.div`
	border: 2px solid aquamarine;
	width: fit-content;
	padding: 10px;
	margin: 0px 0px 10px 0px;
	border-radius: 5px;
	background-color: #8ec5fc;
	background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
`

export const NotificationContainer = styled.div`
	background-color: grey;
	padding: 10px;
	border-radius: 5px;
	text-align: center;
	font-size: 25px;
	width: 50%;
	min-height: 20px;
`

export const ContainerSpacedBetween = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	min-height: 20px;
`

export const FormOneField = styled.form`
	display: flex;
	gap: 10px;
	margin-top: 5px;
	min-height: 20px;
`

export const Div = styled.div``
