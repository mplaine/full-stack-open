import { Link } from 'react-router-dom'
import LoginStatus from './LoginStatus'

const Menu = () => {
  return (
    <nav id="menu">
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/blogs">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
        <li>
          <LoginStatus />
        </li>
      </ul>
    </nav>
  )
}

export default Menu
