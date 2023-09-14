import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  const personsToShow = (search.length === 0) ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    personService
      .getPersons()
      .then(retrievedPersons => {
        setPersons(retrievedPersons)
      })
      .catch(error => {
        setNotification({
          message: 'Failed to retrieve all persons.',
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }, [])

  const addUpdatePerson = (event) => {
    event.preventDefault()

    if (persons.filter(p => p.name === newName).length > 0) {
      // Update person
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = { ...person, number: newNumber }

        personService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `Updated ${updatedPerson.name}.`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `Failed to update ${updatedPerson.name}.`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    }
    // Add person
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
          setNotification({
            message: `Added ${addedPerson.name}.`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification({
            message: `Failed to create ${personObject.name}.`,
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotification({
            message: `Deleted ${person.name}.`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification({
            message: `Failed to delete ${person.name}.`,
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter text={search} handleChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={addUpdatePerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handlePersonClick={deletePerson} />
    </div>
  )
}

export default App
