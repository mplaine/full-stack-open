import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import compareByLikes from './utils'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogsToShow = [...blogs].sort(compareByLikes)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const login = async (username, password) => {
    let isSuccess = false

    try {
      const user = await loginService.login({ username, password })
      if (user) {
        window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        dispatch(setNotification('success', `${user.name} logged in successfully`, 5))
        isSuccess = true
      }
    } catch (exception) {
      const message = exception.response.data === '' ? exception.message : exception.response.data.error
      dispatch(setNotification('error', message, 5))
    }

    return isSuccess
  }

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm login={login} />
    </div>
  )

  const blogsView = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <Button handleClick={handleLogout} text="logout" />
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} user={user} />
      </Togglable>
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )

  const handleLogout = (event) => {
    dispatch(setNotification('success', `${user.name} logged out successfully`, 5))
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInBlogAppUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInBlogAppUserJSON) {
      const user = JSON.parse(loggedInBlogAppUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return <>{user === null ? loginView() : blogsView()}</>
}

export default App
