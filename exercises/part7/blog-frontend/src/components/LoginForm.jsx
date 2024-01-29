import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(login(username, password))
    resetForm()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:
        <input type="text" value={username} name="Username" onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        password:
        <input type="password" value={password} name="Password" onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
