import React from 'react';
import { connect } from 'react-redux';
import useField from '../hooks/index';

// reducers & actions
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

  const contentField = useField('text');

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = contentField.value;
    contentField.value = '';
    props.createAnecdote(content);
    props.setNotification(`Anecdote ${content} created.`, 3);
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input {...contentField} />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);

//export default AnecdoteForm;