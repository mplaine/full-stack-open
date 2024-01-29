import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Header from './Header'
import LoginStatus from './LoginStatus'
import Notification from './Notification'
import Togglable from './Togglable'

const Blogs = () => {
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  return (
    <div>
      <Header name="blogs" />
      <Notification />
      <LoginStatus />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} user={user} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Blogs
