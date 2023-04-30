const notificationReducer = (state, action) => {
    switch(action.type){
      case 'set': 
        return action.payload
      case 'remove': 
        return ''
      default: 
        return state
    }
}

export default notificationReducer
  