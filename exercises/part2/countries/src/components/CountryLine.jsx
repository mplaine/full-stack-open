const CountryLine = ({ country, handleClick }) =>
  <li>
    {country.name.common} <button onClick={() => handleClick(country)}>show</button>
  </li>

export default CountryLine
