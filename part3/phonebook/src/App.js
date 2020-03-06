import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddNew from './components/AddNew';
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons);
			});
	}, []);

  const filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().indexOf(filter) > -1
  );

  const addName = (event) => {
    event.preventDefault();

    const personExists = persons.findIndex((person) =>
      person.name === newName
    );

    if (personExists > 0) {
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        personService
          .update(persons[personExists].id, {name: newName, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== persons[personExists].id ? person : updatedPerson));
            setNotification(`${updatedPerson.name} updated successfully.`);
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
          .catch(error => {
            console.log('error!?');
            setNotification(`Information for ${newName} has already been removed from the server.`);
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          });
      };
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setNotification(`${newName} added successfully.`);
          setTimeout(() => {
            setNotification(null)
          }, 5000);
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    };
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(deletedPerson => {
          console.log(deletedPerson);
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={filter} handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <AddNew submit={addName} newNameValue={newName} newNumberValue={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
};

export default App;