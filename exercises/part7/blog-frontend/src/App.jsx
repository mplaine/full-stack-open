import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import compareByLikes from './utils'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogsToShow = [...blogs].sort(compareByLikes)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm />
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
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return <>{user === null ? loginView() : blogsView()}</>
}

export default App
