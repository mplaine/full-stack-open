const CountryDetails = ({ country, weather }) =>
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital[0]}</div>
    <div>area {country.area}</div>
    <h4>languages:</h4>
    <ul>
      {Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))}
    </ul>
    <img src={country.flags.svg} width="150" />
    {weather &&
      <>
        <h3>Weather in {country.capital[0]}</h3>
        <p>temperature {weather.main.temp} Celcius</p>
        <div><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /></div>
        <p>wind {weather.wind.speed} m/s</p>
      </>
    }
  </div>

export default CountryDetails
