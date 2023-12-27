import { useState } from 'react'


const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isSuccess = login(username, password)
    if (isSuccess) {
      resetForm()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username <input type="text" value={username} name="Username" onChange={ event => setUsername(event.target.value)} />
      </div>
      <div>
        password <input type="password" value={password} name="Password" onChange={ event => setPassword(event.target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
