import * as actionTypes from '../actions/const';

const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  let { notifications } = state;

  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      if (Array.isArray(notifications)) {
        notifications = [...notifications, action.payload];
        return { ...state, notifications };
      }
      break;

    case actionTypes.DELETE_NOTIFICATION:
      if (Array.isArray(notifications) && notifications.length > 0) {
        notifications = [...notifications.splice(0, notifications.length - 1)];
        return { ...state, notifications };
      }
      break;
    default:
      return state;
  }
};

export default notificationReducer;
