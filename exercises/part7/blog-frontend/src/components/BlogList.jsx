import { useSelector } from 'react-redux'
import Blog from './Blog'
import utils from '../utils'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsToShow = [...blogs].sort(utils.compareByLikes)
  const user = useSelector((state) => state.user)

  return (
    <>
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  )
}

export default BlogList
