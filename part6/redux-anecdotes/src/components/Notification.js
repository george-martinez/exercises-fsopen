import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const { notification, timeToDisplay } = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none'
  }

  useEffect(() => {
    let timeOutId = null

    if (notification) {
      timeOutId = setTimeout(() => {
        dispatch(removeNotification())
      }, timeToDisplay)
    }

    return () => {
      clearTimeout(timeOutId)
    }
  }, [notification, dispatch, timeToDisplay]);
  
  return (
    <div style={style}>
      {
        notification
      }
    </div>
  )
}

export default Notification