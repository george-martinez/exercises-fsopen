const Notifications = ({ notificationInfo, setNotificationInfo }) => {
    if(notificationInfo.classProp === 'error') {
        return (
            <h2 className={notificationInfo.classProp}>{notificationInfo.message}</h2>
        )
    }

    return (
        <h2 className={notificationInfo.classProp}>{notificationInfo.message}</h2>
    )
}

export default Notifications