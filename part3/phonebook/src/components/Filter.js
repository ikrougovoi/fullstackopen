import React from 'react';

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      <h3>search</h3>
      filter shown with <input value={filter} onChange={handleChange} />
    </div>
  )
};

export default Filter;