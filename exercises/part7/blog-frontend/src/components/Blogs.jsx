import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Togglable from './Togglable'

const Blogs = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} user={user} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Blogs
