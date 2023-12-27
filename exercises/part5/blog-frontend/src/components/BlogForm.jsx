import { useState, useEffect } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({ blogs, setBlogs }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const cleanForm = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      const createdBlog = await blogService.create(newBlogObject)
      if (createdBlog) {
        setBlogs(blogs.concat(createdBlog))
        cleanForm()
      }
    } catch (exception) {
      console.error(`Failed to create a new blog "${newBlogObject.title}"`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:<input type="text" value={newTitle} name="Title" onChange={({ target }) => setNewTitle(target.value)} />
      </div>
      <div>
        author:<input type="text" value={newAuthor} name="Author" onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
        url:<input type="text" value={newUrl} name="URL" onChange={({ target }) => setNewUrl(target.value)} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm
