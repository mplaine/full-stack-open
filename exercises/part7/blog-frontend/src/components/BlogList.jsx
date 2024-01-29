import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import utils from '../utils'
import { initializeBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogsToShow = [...blogs].sort(utils.compareByLikes)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <>
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  )
}

export default BlogList
