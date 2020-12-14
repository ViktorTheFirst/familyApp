import * as actionTypes from './const';

export const showNotification = (notification, type) => {
  console.log('[Notification Actions] - notification: ', notification);
  return (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_NOTIFICATION,
      payload: { notification, type },
    });
  };
};

export const deleteNotification = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_NOTIFICATION,
    });
  };
};
