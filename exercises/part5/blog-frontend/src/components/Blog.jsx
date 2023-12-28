import { useState } from 'react'
import Button from './Button'


const Blog = ({ blog, updateBlog }) => {
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
    event.preventDefault()

    toggleVisibility()
  }

  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateBlog(updatedBlogObject)
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
        </>
      }
    </div>
  )
}

export default Blog
