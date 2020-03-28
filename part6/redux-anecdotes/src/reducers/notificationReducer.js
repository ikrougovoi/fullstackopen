let currentNotificationId;

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD':
      return action.data.message;
    case 'CLEAR':
      return null;
    default:
      return state;
  };
};

export const createNotification = content => {
  return {
    type: 'ADD',
    data: {
      message: content
    }
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  };
};

export const setNotification = (message, duration) => {
  clearTimeout(currentNotificationId);
  return dispatch => {
    dispatch(createNotification(message));
    currentNotificationId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default reducer;