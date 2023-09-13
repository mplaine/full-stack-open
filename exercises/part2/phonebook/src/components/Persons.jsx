import Person from './Person'

const Persons = ({ persons }) =>
  <ul style={{listStyleType: "none", margin: 0, padding: 0}}>
    {persons.map(person => <Person key={person.id} person={person} />)}
  </ul>

export default Persons
