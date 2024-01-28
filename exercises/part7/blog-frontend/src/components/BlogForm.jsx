import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
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
      url: newUrl,
    }

    const isSuccess = createBlog(newBlogObject)
    if (isSuccess) {
      resetForm()
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:<input type="text" value={newTitle} name="Title" onChange={ event => setNewTitle(event.target.value)} />
        </div>
        <div>
          author:<input type="text" value={newAuthor} name="Author" onChange={ event => setNewAuthor(event.target.value)} />
        </div>
        <div>
          url:<input type="text" value={newUrl} name="URL" onChange={ event => setNewUrl(event.target.value)} />
        </div>
        <div>
          <button id="create-blog-button" type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
