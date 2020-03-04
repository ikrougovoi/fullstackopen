import React from 'react';

const AddNew = ({ submit, newNameValue, newNumberValue, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={submit}>
        name: <input value={newNameValue} onChange={handleNameChange} /> <br/>
        number: <input value={newNumberValue} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
};

export default AddNew;