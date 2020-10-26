import * as actionTypes from '../actions/const';

const initialState = {
  memCount: 0,
  memories: null,
};

const memoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_MEMORIES:
      return {
        ...state,
        memCount: action.payload.results,
        memories: action.payload.data.memories,
      };
    default:
      return state;
  }
};

export default memoryReducer;
