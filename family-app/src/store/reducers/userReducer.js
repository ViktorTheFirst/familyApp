import * as actionTypes from '../actions/const';

const initialState = {
  currUser: {
    name: null,
    sureName: null,
    email: null,
    userID: null,
    profileImage: null,
    isAdmin: null,
  },
  users: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return { ...state, users: action.payload.users };
    case actionTypes.GET_USER:
      const {
        name,
        sureName,
        email,
        _id,
        profileImage,
        isAdmin,
      } = action.payload.user;
      return {
        ...state,
        currUser: {
          name,
          sureName,
          email,
          userID: _id,
          profileImage,
          isAdmin,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
