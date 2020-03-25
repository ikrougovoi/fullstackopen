import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {

  Notification.propTypes = {
    message: PropTypes.object.isRequired
  };

  if (message.type === '' || message.text === '') {
    return null;
  }

  return (
    <div className={`alert ${message.type}`}>
      {message.text}
    </div>
  );
};

export default Notification;