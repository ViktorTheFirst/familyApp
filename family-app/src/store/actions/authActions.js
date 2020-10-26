import * as actionTypes from '../actions/const';
const youripadress = 'http://localhost:4000';

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
      //console.log('data in actions: ', data);
      const res = await fetch(`${youripadress}/api/v1/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      const serverData = await res.json();
      if (serverData.status === 'fail') {
        console.log('ERROR fatching data from server on register');
        dispatch(authFail(serverData));
      }

      if (serverData.status === 'success') {
        localStorage.setItem('token', serverData.token);
        localStorage.setItem('email', serverData.data.user.email);
        localStorage.setItem('_id', serverData.data.user._id);
        dispatch(authSuccess(serverData));
      }
      return serverData.status;
    } catch (err) {
      console.log(err);
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
        console.log('ERROR fatching data from server on login');
        dispatch(authFail(serverData));
      }

      if (serverData.status === 'success') {
        localStorage.setItem('token', serverData.token);
        localStorage.setItem('email', serverData.data.user.email);
        localStorage.setItem('_id', serverData.data.user._id);
        //console.log('BEFORE DISPATCH IN login');
        dispatch(authSuccess(serverData));
      }
      return serverData.status;
    } catch (err) {
      console.log(err);
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
    //TODO: this func rerenderss
    if (token) {
      //console.log('BEFORE DISPATCH IN persistAuthCheck');
      dispatch(authSuccess(authData));
    }
  };
};
