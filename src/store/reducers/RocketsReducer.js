import {
  GET_ALL_ROCKETS
} from '../actions/types';

const initialState = {
  allRockets: []
};

const RocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROCKETS:
      return {
        ...state,
        allRockets: [...action.value],
      };
    default:
      return state;
  }
};

export default RocketsReducer;
