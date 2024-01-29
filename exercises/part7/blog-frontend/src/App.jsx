import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import compareByLikes from './utils'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
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

  const createBlog = async (newBlogObject) => {
    let isSuccess = false
    blogFormRef.current.toggleVisibility()

    try {
      const createdBlog = await blogService.createBlog(newBlogObject)
      if (createdBlog) {
        const userId = createdBlog.user
        createdBlog.user = {
          username: user.username,
          name: user.name,
          id: userId
        }
        setBlogs(blogs.concat(createdBlog).sort(compareByLikes))
        dispatch(setNotification('success', `A new blog "${createdBlog.title}" was successfully created`, 5))
        isSuccess = true
      }
    } catch (exception) {
      const message = exception.response.data === '' ? exception.message : exception.response.data.error
      dispatch(setNotification('error', message, 5))
    }

    return isSuccess
  }

  const updateBlog = async (updatedBlogObject) => {
    try {
      const updatedBlog = await blogService.updateBlog(updatedBlogObject.id, updatedBlogObject)
      if (updatedBlog) {
        const userId = updatedBlog.user
        updatedBlog.user = {
          username: user.username,
          name: user.name,
          id: userId
        }
        setBlogs(blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)).sort(compareByLikes))
        dispatch(setNotification('success', `An existing blog "${updatedBlog.title}" was successfully updated`, 5))
      }
    } catch (exception) {
      const message = exception.response.data === '' ? exception.message : exception.response.data.error
      dispatch(setNotification('error', message, 5))
    }
  }

  const deleteBlog = async (blogToBeDeleted) => {
    try {
      await blogService.deleteBlog(blogToBeDeleted.id)
      setBlogs(blogs.filter((blog) => blog.id !== blogToBeDeleted.id).sort(compareByLikes))
      dispatch(setNotification('success', `An existing blog "${blogToBeDeleted.title}" was successfully removed`, 5))
    } catch (exception) {
      const message = exception.response.data === '' ? exception.message : exception.response.data.error
      dispatch(setNotification('error', message, 5))
    }
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
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      ))}
    </div>
  )

  const handleLogout = (event) => {
    dispatch(setNotification('success', `${user.name} logged out successfully`, 5))
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getBlogs().then((blogs) => setBlogs(blogs.sort(compareByLikes)))
  }, [])

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
