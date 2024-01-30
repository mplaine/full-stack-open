import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from './Header'
import LoginStatus from './LoginStatus'
import Notification from './Notification'
import UserBlogList from './UserBlogList'

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Header name="blogs" />
      <Notification />
      <LoginStatus />
      <Header name={user.name} />
      <Header name="added blogs" size="3" />
      <UserBlogList />
    </div>
  )
}

export default User
