import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
      const eventHandler = response => {
        setPersons(response.data);
      }
      const promise = axios.get('http://localhost:3001/persons');
      promise.then(eventHandler);
  }, [])

  

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

    if (persons.some(person => person.name === personObject.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }


  return (
    <div>
    <h2>Phonebook</h2>
    <Filter filter={filter} handleFilterChange={handleFilterChange}/>
    <PersonForm 
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addNewPerson={addNewPerson}
    />
    <h2>Numbers</h2>
    <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App
