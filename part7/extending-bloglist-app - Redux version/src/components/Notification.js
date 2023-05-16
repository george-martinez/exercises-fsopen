import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationContainer } from './StyledComponents'

const Notification = () => {
	const { notification, timerId } = useSelector(state => state.notification)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => clearTimeout(timerId)
	}, [notification, timerId, dispatch])

	return <NotificationContainer>{notification}</NotificationContainer>
}

export default Notification
