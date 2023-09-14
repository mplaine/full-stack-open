const CountryDetails = ({ country }) =>
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h4>languages:</h4>
    <ul>
      {Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))}
    </ul>
    <img src={country.flags.svg} width="150" />
  </div>

export default CountryDetails
