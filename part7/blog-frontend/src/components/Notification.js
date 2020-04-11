import React from 'react';
import { useSelector } from 'react-redux';

// bootstrap
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Notification = () => {

  const notification = useSelector(state => state.notification);

  if (!notification) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Alert variant={notification.type}>
          {notification.content}
        </Alert>
      </Col>
    </Row>
  );
};

export default Notification;