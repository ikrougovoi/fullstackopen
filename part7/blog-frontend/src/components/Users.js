import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const Users = () => {

  const users = useSelector(state => state.users);

  if (!users) {
    return null;
  }

  return (
    <Row>
      <Col xs lg={{ span: 8, offset: 2 }}>
        <h2>Users</h2>
        <Table striped border hover size='sm'>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Users;