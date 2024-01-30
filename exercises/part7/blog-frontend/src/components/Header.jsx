const Header = ({ name, size }) => {
  const SIZE_3 = '3'

  switch (size) {
    case SIZE_3:
      return <h3>{name}</h3>
    default:
      return <h2>{name}</h2>
  }
}

export default Header
