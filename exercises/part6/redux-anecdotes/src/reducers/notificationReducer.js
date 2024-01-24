import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload.message
    },
    hideNotification(state) {
      state.message = null
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(showNotification({ message: message }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
