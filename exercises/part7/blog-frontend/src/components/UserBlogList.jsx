import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogList = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const userBlogs = blogs.filter((blog) => blog.user.id === id)

  return (
    <div id="user-blog-list">
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogList
