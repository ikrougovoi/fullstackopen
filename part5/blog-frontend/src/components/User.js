import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user, handleLogout }) => {

  User.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
  };

  return (
    <div className='userInfo'>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default User;