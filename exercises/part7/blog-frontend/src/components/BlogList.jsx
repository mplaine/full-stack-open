import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import utils from '../utils'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsToShow = [...blogs].sort(utils.compareByLikes)

  return (
    <div id="blog-list">
      <ul>
        {blogsToShow.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
