import * as actionTypes from '../actions/const';
const youripadress = process.env.REACT_APP_API;

//------------------------------------------------------------------------------------

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
//------------------------------------------------------------------------------------
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};
//------------------------------------------------------------------------------------
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    authError: error,
  };
};

//------------------------------------------------------------------------------------
export const register = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());

      const res = await fetch(`${youripadress}/api/v1/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      const serverData = await res.json();
      console.log('in AUTH: ', serverData);
      if (serverData.status === 'fail') {
        dispatch({
          type: actionTypes.SHOW_NOTIFICATION,
          payload: {
            /* error can come from validation or from existing user */
            notification: serverData.error
              ? serverData.error._message
              : serverData.message,
            type: 'error',
          },
        });
        dispatch(authFail(serverData));
      }

      dispatch(authSuccess());
      return serverData;
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Error while preforming user registration',
          type: 'error',
        },
      });
      dispatch(authFail(err));
    }
  };
};

//------------------------------------------------------------------------------------
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('_id');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

//------------------------------------------------------------------------------------
export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const res = await fetch(`${youripadress}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      const serverData = await res.json();

      if (serverData.status === 'fail') {
        dispatch({
          type: actionTypes.SHOW_NOTIFICATION,
          payload: {
            notification: serverData.message,
            type: 'error',
          },
        });
        dispatch(authFail(serverData));
      }

      if (serverData.status === 'success') {
        localStorage.setItem('token', serverData.token);
        localStorage.setItem('email', serverData.data.user.email);
        localStorage.setItem('_id', serverData.data.user._id);

        dispatch(authSuccess(serverData));
      }
      return serverData;
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Failed to log user in',
          type: 'error',
        },
      });
    }
  };
};

//------------------------------------------------------------------------------------

export const persistAuthCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const _id = localStorage.getItem('_id');
    const authData = {
      token,
      data: {
        user: {
          email,
          _id,
        },
      },
    };

    if (token) {
      dispatch(authSuccess(authData));
    }
  };
};
