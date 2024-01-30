import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Login from './components/Login'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  if (user === null) {
    return <Login />
  }

  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}

export default App
