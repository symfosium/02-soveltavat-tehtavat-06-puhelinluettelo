import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  })

  const handleNotifications = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredPersons = persons.filter(person => person.name && person.name.toLowerCase().includes(filter.toLowerCase()));


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addNewPerson = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      const person = persons.find(person => person.name === newName);
      const result = window.confirm(`${person.name} is already in your phonebook, do you want to replace the old phone number?`);
      if (result) {
        const changedPerson = {
          ...person,
          number: newNumber
        }
        personService
          .changePersonNumber(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(pers => pers.id !== returnedPerson.id ? pers : returnedPerson));
          })
          .catch(error => {
            console.log("Error", error);
            handleNotifications(`Information of ${newName} has already been removed from server`, 'error');
          })
          setNewName('')
          setNewNumber('')
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
        setNewNumber('')
        const message = `Added ${newName}`;
        handleNotifications(message, 'success');
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
        const message = `Deleted ${response.name}`;
        handleNotifications(message, 'success');

      })
      .catch(error => {
        console.log(error)
        handleNotifications(message, 'error');
      })
  }


  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={notification} type={notificationType}/>
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
