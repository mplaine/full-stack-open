import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import utils from '../utils'
import { initializeUsers } from '../reducers/userReducer'

const UsersTable = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const usersToShow = [...users].sort(utils.compareByBlogs)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {usersToShow.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersTable
