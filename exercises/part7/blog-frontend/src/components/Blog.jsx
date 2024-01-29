import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from './Button'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleToggle = (event) => {
    toggleVisibility()
  }

  const handleLike = (event) => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    dispatch(updateBlog(updatedBlogObject, user))
    dispatch(setNotification('success', `An existing blog "${updatedBlogObject.title}" was successfully updated`, 5))
  }

  const handleDelete = (event) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification('success', `An existing blog "${blog.title}" was successfully removed`, 5))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} <Button handleClick={handleToggle} text={visible ? 'hide' : 'view'} />
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <Button handleClick={handleLike} text="like" />
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <div>
              <Button handleClick={handleDelete} text="remove" />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
