import * as actionTypes from './const';
const youripadress = 'http://localhost:4000';

//---------------------------------------------------------------------
export const get_all_users = () => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/v1/users`);
    const serverData = await res.json();

    if (serverData.status === 'success') {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        payload: {
          users: serverData.data.users,
        },
      });
    } else {
      console.log('ERROR fatching data from server on get_all_users');
    }
    return serverData.data.users;
  } catch (err) {
    dispatch({
      type: actionTypes.SHOW_NOTIFICATION,
      payload: {
        notification: 'Error fetching users from server',
        type: 'error',
      },
    });
  }
};
//---------------------------------------------------------------------------

export const get_user = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authRed.currUser.token;

      const res = await fetch(`${youripadress}/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: token,
        },
      });
      const serverData = await res.json();

      if (serverData.status === 'success') {
        dispatch({
          type: actionTypes.GET_USER,
          payload: {
            user: serverData.data.user,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Error fetching user info from server',
          type: 'error',
        },
      });
    }
  };
};
