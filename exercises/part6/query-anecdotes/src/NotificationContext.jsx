/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload
    case "HIDE":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationValueAndDispatch = useContext(NotificationContext)
  return notificationValueAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationValueAndDispatch = useContext(NotificationContext)
  return notificationValueAndDispatch[1]
}

export default NotificationContext
