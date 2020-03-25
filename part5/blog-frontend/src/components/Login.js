import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ postLogin }) => {

  Login.propTypes = {
    postLogin: PropTypes.func.isRequired
  };

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const blankCredentials = {
    username: '',
    password: ''
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    postLogin(credentials);
    setCredentials(blankCredentials);
  };

  return (
    <div>
      <form className='form' onSubmit={handleLoginSubmit}>
        Username: <input type="text" id='username' value={credentials.username} onChange={ (event) => setCredentials({ ...credentials, username: event.target.value }) } /> Password: <input type="password" id='password' value={credentials.password} onChange={ (event) => setCredentials({ ...credentials, password: event.target.value }) }/> <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  );
};

export default Login;