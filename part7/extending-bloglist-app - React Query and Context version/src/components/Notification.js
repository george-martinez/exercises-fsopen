import { useEffect } from 'react'
import { NotificationContainer } from './StyledComponents'
import {
	useNotificationDispatch,
	useNotificationValue,
} from '../context/NotificationContext'

const Notification = () => {
	const notificationObject = useNotificationValue()
	const notificationDispatch = useNotificationDispatch()

	useEffect(() => {
		if (
			notificationObject.notification != null &&
			notificationObject?.timerId === null
		) {
			const timerId = setTimeout(() => {
				notificationDispatch({ type: 'clearNotifications' })
			}, notificationObject.notificationDuration * 1000)

			notificationDispatch({ type: 'setTimerId', payload: { timerId } })
		}
		return () => clearTimeout(notificationObject.timerId)
	}, [notificationObject, notificationDispatch])

	if (!notificationObject.notification) {
		return (
			<NotificationContainer
				style={{ visibility: 'hidden' }}
			></NotificationContainer>
		)
	}

	return (
		<NotificationContainer>
			{notificationObject.notification}
		</NotificationContainer>
	)
}

export default Notification
