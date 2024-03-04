import { v4 as uuidv4 } from 'uuid';

const Persons = ({filteredPersons, handleDelete}) => {
   return (
      <ul>
      {filteredPersons.map(person => (
         <li key={uuidv4()}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
         </li>
  ))}
      </ul>
   )
}

export default Persons;