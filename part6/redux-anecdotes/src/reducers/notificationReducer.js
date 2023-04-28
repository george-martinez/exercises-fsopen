import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action){
            const notificationObject = action.payload
            
            return notificationObject
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const createNotification = (notification, timeToDisplay = 5) => {
    const notificationObject = {
        notification,
        timeToDisplay: timeToDisplay * 1000
    }

    return dispatch => {
        dispatch(setNotification(notificationObject))
    }
}

export default notificationSlice.reducer