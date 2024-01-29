import Header from './Header'
import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = () => {
  return (
    <div>
      <Header name="log in to application" />
      <Notification />
      <LoginForm />
    </div>
  )
}

export default Login
