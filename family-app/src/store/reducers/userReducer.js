import * as actionTypes from '../actions/const';

const initialState = {
  currUser: {
    name: null,
    sureName: null,
    email: null,
    userID: null,
    profileImage: null,
  },
  users: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return { ...state, users: action.payload.users };
    case actionTypes.GET_USER:
      return {
        ...state,
        currUser: {
          name: action.payload.user.name,
          sureName: action.payload.user.sureName,
          email: action.payload.user.email,
          userID: action.payload.user._id,
          profileImage: action.payload.user.profileImage,
        },
      };
  }
  return state;
};

export default userReducer;
