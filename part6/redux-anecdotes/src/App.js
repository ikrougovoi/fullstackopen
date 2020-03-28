import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// components
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';

// reducers & actions
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList /><br/>
      <AnecdoteForm />
    </div>
  )
}

export default App