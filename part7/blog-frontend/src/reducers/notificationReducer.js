let currentNotificationId;

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD':
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const createNotification = (type = 'success', content) => {
  return {
    type: 'ADD',
    data: {
      type: type,
      content: content
    }
  };
};

const clearNotification = () => {
  return {
    type: 'CLEAR'
  };
};

export const setNotification = (type, content, duration = 3) => {
  clearTimeout(currentNotificationId);
  return dispatch => {
    dispatch(createNotification(type, content));
    currentNotificationId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default reducer;