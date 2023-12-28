import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import compareByLikes from './utils'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const login = async (username, password) => {
    let isSuccess = false

    try {
      const user = await loginService.login({ username, password })
      if (user) {
        window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setNotification({
          message: `${user.name} logged in successfully`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        isSuccess = true
      }
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
          id: userId,
        }
        setBlogs(blogs.concat(createdBlog).sort(compareByLikes))
        setNotification({
          message: `A new blog "${createdBlog.title}" was successfully created`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        isSuccess = true
      }
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
          id: userId,
        }
        setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog).sort(compareByLikes))
        setNotification({
          message: `An existing blog "${updatedBlog.title}" was successfully updated`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogToBeDeleted) => {
    try {
      await blogService.deleteBlog(blogToBeDeleted.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToBeDeleted.id).sort(compareByLikes))
      setNotification({
        message: `An existing blog "${blogToBeDeleted.title}" was successfully removed`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <LoginForm login={login} />
    </div>
  )

  const blogsView = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in <Button handleClick={handleLogout} text="logout" /></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )

  const handleLogout = (event) => {
    setNotification({
      message: `${user.name} logged out successfully`,
      type: 'success'
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getBlogs().then(blogs =>
      setBlogs(blogs.sort(compareByLikes))
    )
  }, [])

  useEffect(() => {
    const loggedInBlogAppUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInBlogAppUserJSON) {
      const user = JSON.parse(loggedInBlogAppUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <>
      {user === null
        ? loginView()
        : blogsView()
      }
    </>
  )
}

export default App
