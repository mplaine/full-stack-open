import Header from './Header'
import LoginStatus from './LoginStatus'
import Notification from './Notification'
import UsersTable from './UsersTable'

const Users = () => {
  return (
    <div>
      <Header name="blogs" />
      <Notification />
      <LoginStatus />
      <Header name="Users" />
      <UsersTable />
    </div>
  )
}

export default Users
