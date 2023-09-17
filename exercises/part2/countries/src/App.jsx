import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Search from './components/Search'
import countryService from './services/countries'
import weatherService from './services/weather'
import compare from './utils'

const App = () => {
  // State hooks
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  // Constants
  const owm_api_key = import.meta.env.VITE_OWM_API_KEY
  const countriesToShow = (search.length === 0) ? [] : countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  // Functions
  const handleSearchChange = (event) => setSearch(event.target.value)
  const showCountryDetails = (country) => {
    setSearch(country.name.common)
    setCountry(country)
  }

  // Effect hooks
  useEffect(() => {
    countryService
      .getCountries()
      .then(retrievedCountries => {
        setCountries(retrievedCountries.sort(compare))
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setCountry(countriesToShow[0])
    }
  }, [countriesToShow])

  useEffect(() => {
    if (country) {
      weatherService
        .getWeather(owm_api_key, country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then(retrievedWeather => {
          setWeather(retrievedWeather)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [country])

  return (
    <div>
      <Search text={search} handleChange={handleSearchChange} />
      <Countries countries={countriesToShow} handleCountryClick={showCountryDetails} countryDetailsWeather={weather} />
    </div>
  )
}

export default App
