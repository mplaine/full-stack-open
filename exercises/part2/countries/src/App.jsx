import { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import countryService from './services/countries'
import compare from './utils'

const App = () => {
  // State hooks
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  // Constants
  const countriesToShow = (search.length === 0) ? [] : countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  // Event handlers
  const handleSearchChange = (event) => setSearch(event.target.value)

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

  return (
    <div>
      <Search text={search} handleChange={handleSearchChange} />
      <Countries countries={countriesToShow} />
      {/* {
        countriesToShow.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : 1 === countriesToShow.length ? (
          <div>Show country details</div>
        ) : (
          <Countries countries={countriesToShow} />
        )
      } */}
    </div>
  )
}

export default App
