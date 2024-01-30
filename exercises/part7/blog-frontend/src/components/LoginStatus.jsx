import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { logout } from '../reducers/loginReducer'

const LoginStatus = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = (event) => {
    dispatch(logout())
  }

  if (user === null) {
    return null
  }

  return (
    <div>
      {user.name} logged in <Button handleClick={handleLogout} text="logout" />
    </div>
  )
}

export default LoginStatus
