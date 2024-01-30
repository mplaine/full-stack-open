import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from './Button'
import CommentList from './CommentList'
import Header from './Header'

const Blog = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === blogId)
  const user = useSelector((state) => state.user)

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

  if (!blog) {
    return null
  }

  return (
    <div>
      <Header name={`${blog.title} ${blog.author}`} />
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes <Button handleClick={handleLike} text="like" />
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username && (
        <div>
          <Button handleClick={handleDelete} text="remove" />
        </div>
      )}
      <Header name="comments" size="3" />
      <CommentList />
    </div>
  )
}

export default Blog
