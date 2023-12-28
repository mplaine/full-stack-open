import { useState } from 'react'
import Button from './Button'


const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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
      user: blog.user.id,
    }

    updateBlog(updatedBlogObject)
  }

  const handleDelete = (event) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <Button handleClick={handleToggle} text={visible ? 'hide' : 'view'} />
      </div>
      {visible &&
        <>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <Button handleClick={handleLike} text="like" />
          </div>
          <div>
            {blog.user.name}
          </div>
          {user.username === blog.user.username &&
            <div>
              <Button handleClick={handleDelete} text="remove" />
            </div>
          }
        </>
      }
    </div>
  )
}

export default Blog
