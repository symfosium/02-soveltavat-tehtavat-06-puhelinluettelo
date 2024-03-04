import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredPersons = 

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === personObject.name);


    if (existingPerson) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      personService
      .changePersonNumber(existingPerson.id, newNumber)
      .then(updatedPerson => {
        setPersons(persons.map(person =>
          person.id !== existingPerson.id ? person : updatedPerson
        ));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error changing number:', error);
      });

    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
        setNewNumber('')
      })
    }

  }

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Do you want to remove ${name}?`);

    if (!confirm) {
      return
    }

    personService
      .removePerson(id)
      .then(response => {
        const filteredPersons = persons.filter(person => person.id !== id);
        setPersons(filteredPersons);

      })
      .catch(error => {
        console.log(error)
      })
  }


  return (
    <div>
    <h2>Phonebook</h2>
    <Filter filter={filter} handleFilterChange={handleFilterChange}/>
    <h3>Add a new</h3>
    <PersonForm 
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addNewPerson={addNewPerson}
    />
    <h2>Numbers</h2>
    <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
