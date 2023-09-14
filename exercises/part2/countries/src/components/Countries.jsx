import CountryDetails from './CountryDetails'
import CountryLine from './CountryLine'

const Countries = ({ countries }) => {
  let content = <></>
  if (countries.length > 10) {
    content = <div>Too many matches, specify another filter</div>
  }
  else if (1 < countries.length && countries.length <= 10) {
    content =
      <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {countries.map(c => <CountryLine key={c.name.common} country={c} />)}
      </ul>
  }
  else if (countries.length === 1) {
    content = <CountryDetails country={countries[0]} />
  }

  return content
}

export default Countries
