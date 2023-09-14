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
      .then(retrievedPersons => {
        setPersons(retrievedPersons)
      })
      .catch(error => {
        alert('Failed to retrieve all persons.')
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(p => p.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        personService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Failed to update a person ${updatedPerson.id}.`)
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .createPerson(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert('Failed to create a new person.')
        })
    }
  }
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          alert(`Failed to delete a person ${person.id}.`)
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
      <Persons persons={personsToShow} handlePersonClick={deletePerson} />
    </div>
  )
}

export default App
