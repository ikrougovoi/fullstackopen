import React from 'react';

const Filter = ({ filterHandler }) => {
  return (
    <>
      <input onChange={filterHandler} />
    </>
  )
};

export default Filter;