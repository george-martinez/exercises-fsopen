import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Notification = () => {
	const { notification, timerId } = useSelector(state => state.notification)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => clearTimeout(timerId)
	}, [notification, timerId, dispatch])

	return <div className='notification'>{notification}</div>
}

export default Notification
