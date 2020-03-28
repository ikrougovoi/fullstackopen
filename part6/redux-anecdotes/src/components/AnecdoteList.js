import React from 'react';
import { connect } from 'react-redux';
import { increaseVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = (props) => {

  const anecdotes = props.anecdotes;
  const searchString = props.filter.split(' ');

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return searchString.every((el) => {
      return anecdote.content.indexOf(el) > -1;
    });
  });

  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });

  
  const vote = (anecdote) => {
    props.increaseVote(anecdote);
    props.setNotification(`You voted for ${anecdote.content}`, 5);
    /*
    dispatch(increaseVote(anecdote));
    dispatch(setNotification(`You voted for ${anecdote.content}`, 3));
    */
  };

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote)} />
      )}
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  increaseVote,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

//export default AnecdoteList;