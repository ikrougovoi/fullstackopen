import React from 'react';
import { Link } from 'react-router-dom';

// bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

const User = ({ user }) => {

  if (!user) {
    return null;
  }

  return (
    <Row>
      <Col xs lg={{ span: 8, offset: 2}}>
        <h2>{user.name}</h2>
        <h6>added blogs</h6>
        <ListGroup>
          {user.blogs.map(blog => 
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default User;