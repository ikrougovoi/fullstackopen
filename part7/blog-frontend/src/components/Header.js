import React from 'react';

// components
import AcctHeader from './AcctHeader';
import { Link } from 'react-router-dom';

// bootstrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {

  const currentPage = window.location.pathname.split('/')[1];

  return (
    <Navbar bg='dark' variant='dark' style={{ marginBottom: 10 }}>
      <Navbar.Brand href='/'>Blog Trakr</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/' className={currentPage === '' || currentPage === 'blogs' ? 'active' : ''}>Blogs</Nav.Link>
          <Nav.Link as={Link} to='/users' className={currentPage === 'users' ? 'active' : ''}>Users</Nav.Link>
        </Nav>
        <Nav className={'pull-right'}>
          <AcctHeader />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;