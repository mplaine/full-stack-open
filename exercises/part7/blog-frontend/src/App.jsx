import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Users from './components/Users'
import { initializeUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  if (user === null) {
    return <Login />
  }

  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}

export default App
