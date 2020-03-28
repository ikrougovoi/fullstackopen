// services
import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      return state.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote);
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  };
};

export const increaseVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1};
    const updatedAnecdote = await anecdoteService.update(newAnecdote.id, newAnecdote);
    dispatch ({
      type: 'VOTE',
      data: { id: updatedAnecdote.id }
    });
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    console.log(newAnecdote);
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecodotes = await anecdoteService.getAll();
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecodotes
    });
  };
};

export default reducer