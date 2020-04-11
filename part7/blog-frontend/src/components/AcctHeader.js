import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// actions & reducers
import { userLogout } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

// bootstrap
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AcctHeader = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const dispatchNotification = (type, content, duration = 3) => {
    dispatch(setNotification(type, content, duration));
  };

  const handleLogout = () => {
    dispatch(userLogout());
    dispatchNotification('success', 'Logged out.');
  };

  return (
    <>
      <Navbar.Text>
        Welcome {user.name}!
      </Navbar.Text>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </>
  );
};

export default AcctHeader;