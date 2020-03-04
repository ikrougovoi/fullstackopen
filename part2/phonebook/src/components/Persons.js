import React from 'react';

const Person = ({ person, handleDelete }) => {
  return (
    <p>{person.name} | {person.number} <button onClick={handleDelete}>Delete</button></p>
  )
};

const Persons = ({ persons, handleDelete }) => {

  const showPeople = () => persons.map(person =>
    <Person key={person.name} person={person} handleDelete={() => handleDelete(person.id, person.name)} />
  );

  return (
    <div>
      {showPeople()}
    </div>
  )
};

export default Persons