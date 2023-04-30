import { useEffect } from "react"
import { useNotificationDispatch, useNotificationValue } from "../context/NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()
  
  useEffect(() => {
    let timeOutId = setTimeout(() => {
      notificationDispatch({ type: 'remove' })
    }, 5000)

    return () =>{
      clearTimeout(timeOutId)
    }
  }, [notification, notificationDispatch])

  if (!notification) return null
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
