import Person from './Person'

const Persons = ({ persons, handlePersonClick }) =>
  <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
    {persons.map(person => <Person key={person.id} person={person} handleClick={handlePersonClick} />)}
  </ul>

export default Persons
