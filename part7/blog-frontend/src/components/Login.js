import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// actions & reducers
import { userLogin, userLogout } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

// bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {

  const dispatch = useDispatch();

  const dispatchNotification = (type, content, duration = 3) => {
    dispatch(setNotification(type, content, duration));
  };

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const blankCredentials = {
    username: '',
    password: ''
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (credentials.username === '' || credentials.password === '') {
      dispatchNotification('warning', 'Username and Password cannot be blank.');
      setCredentials(blankCredentials);
      return null;
    }
    try {
      await dispatch(userLogin(credentials));
      dispatchNotification('success', 'Welcome!');
    } catch (exception) {
      dispatchNotification('warning', 'Invalid username or password.');
      setCredentials(blankCredentials);
      dispatch(userLogout());
    }
  };

  return (
    <Row className='justify-content-md-center' style={{ marginTop: 40 }}>
      <Col xs lg='6'>
        <Jumbotron>
          <h2>Blog Trakr Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId='formUserName'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Username' value={credentials.username} onChange={ (event) => setCredentials({ ...credentials, username: event.target.value }) } />
            </Form.Group>
            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' value={credentials.password} onChange={ (event) => setCredentials({ ...credentials, password: event.target.value }) } />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default Login;