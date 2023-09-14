import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const personsToShow = (search.length === 0) ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        alert('Failed to retrieve all persons.')
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert('Failed to create a new person.')
        })
    }
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={search} handleChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
