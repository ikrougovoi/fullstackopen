import userService from '../services/users';
import blogService from '../services/blogs';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      blogService.setToken(action.data.user.token);
      return action.data.user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const userLogin = (credentials) => {
  return async dispatch => {
    const user = await userService.login(credentials);
    window.localStorage.setItem('blogAppUser', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      data: {
        user
      }
    });
  };
};

export const userReturned = () => {
  return async dispatch => {
    const localStorageUser = window.localStorage.getItem('blogAppUser');
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      dispatch({
        type: 'LOGIN',
        data: {
          user
        }
      });
    }
  };
};

export const userLogout = () => {
  window.localStorage.removeItem('blogAppUser');
  return async dispatch => {
    blogService.setToken(null);
    dispatch({
      type: 'LOGOUT'
    });
  };
};

export default reducer;