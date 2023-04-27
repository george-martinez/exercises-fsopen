import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
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
      }, 5000);
    }

    return () => {
      clearTimeout(timeOutId)
    }
  }, [notification, dispatch]);
  
  return (
    <div style={style}>
      {
        `You added/vote this anecdote: ${notification}`
      }
    </div>
  )
}

export default Notification