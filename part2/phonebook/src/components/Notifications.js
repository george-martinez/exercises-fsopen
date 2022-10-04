const Notifications = ({ notificationInfo, setNotificationInfo }) => {
    if(notificationInfo.class === 'error') {
        return (
            <h2 className={notificationInfo.class}>{notificationInfo.message}</h2>
        )
    }

    return (
        <h2 className={notificationInfo.class}>{notificationInfo.message}</h2>
    )
}

export default Notifications