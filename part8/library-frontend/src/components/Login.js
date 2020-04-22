import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken, setPage, show }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('library-user-token', token);
      setToken(token);
      setPage('books');
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <br/>
      <form onSubmit={submit}>
        username <input type='text' onChange={({ target }) => setUsername(target.value)} /><br/>
        password <input type='password' onChange={({ target }) => setPassword(target.value)} /><br/>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;