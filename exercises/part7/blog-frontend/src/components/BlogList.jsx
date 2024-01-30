import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import utils from '../utils'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsToShow = [...blogs].sort(utils.compareByLikes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      {blogsToShow.map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </>
  )
}

export default BlogList
