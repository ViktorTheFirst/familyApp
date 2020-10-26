import * as actionTypes from '../actions/const';

const initialState = {
  loading: false,
  error: null,
  currUser: {
    token: null,
    userID: null,
    name: null,
    sureName: null,
    email: null,
    profileImage: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currUser: {
          token: action.authData.token,
          userID: action.authData.data.user._id,
          name: action.authData.data.user.name,
          sureName: action.authData.data.user.sureName,
          email: action.authData.data.user.email,
          profileImage: action.authData.data.user.profileImage,
        },
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.authError.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        currUser: {
          token: null,
          userID: null,
          name: null,
          sureName: null,
          email: null,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
