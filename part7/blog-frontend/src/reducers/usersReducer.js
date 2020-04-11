import userService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.users;
    case 'ADD_BLOG': {
      const username = action.data.user.username;
      const changedUser = state.find(user => user.username === username);
      changedUser.blogs.push(action.data.blog);
      return state.map(user => user.username !== changedUser.username ? user : changedUser);
    }
    default:
      return state;
  }
};

export const userCreateBlog = (user, blog) => {
  return dispatch => {
    dispatch({
      type: 'ADD_BLOG',
      data: {
        user,
        blog
      }
    });
  };
};

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: {
        users
      }
    });
  };
};

export default reducer;