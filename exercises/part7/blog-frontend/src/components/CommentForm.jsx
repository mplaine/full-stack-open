import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addBlogComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CommentForm = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const [newComment, setNewComment] = useState('')

  const resetForm = () => {
    setNewComment('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newCommentObject = {
      comment: newComment
    }

    dispatch(addBlogComment(id, newCommentObject))
    dispatch(setNotification('success', `A new blog comment "${newCommentObject.comment}" was successfully created`, 5))
    resetForm()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={newComment}
            name="Comment"
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button id="add-comment-button" type="submit">
            add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
