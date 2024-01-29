import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ blogFormRef, user }) => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const resetForm = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    dispatch(addBlog(newBlogObject, user))
    dispatch(setNotification('success', `A new blog "${newBlogObject.title}" was successfully created`, 5))
    blogFormRef.current.toggleVisibility()
    resetForm()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input type="text" value={newTitle} name="Title" onChange={(event) => setNewTitle(event.target.value)} />
        </div>
        <div>
          author:
          <input type="text" value={newAuthor} name="Author" onChange={(event) => setNewAuthor(event.target.value)} />
        </div>
        <div>
          url:
          <input type="text" value={newUrl} name="URL" onChange={(event) => setNewUrl(event.target.value)} />
        </div>
        <div>
          <button id="create-blog-button" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
