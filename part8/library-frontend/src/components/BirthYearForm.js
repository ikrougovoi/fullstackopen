import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR_BIRTH_YEAR, ALL_AUTHORS } from '../queries';

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [birthYear, setBirthYear] = useState('');

  const [ editBirthYear, result ] = useMutation(EDIT_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.log('author not found');
    }
  }, [result.data]); 

  const submit = async (event) => {
    event.preventDefault();

    editBirthYear({ variables: { name, setBornTo: parseInt(birthYear) } });

    setName('');
    setBirthYear('');
  }

  return (
    <div>
      <h2>change birth year</h2>

      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(author => 
              <option key={author.name} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          birth year <input type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>change birth year</button>
      </form>
    </div>
  )
}

export default BirthYearForm;