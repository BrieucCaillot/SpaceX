import {
  GET_ALL_ROCKETS,
  GET_ALL_ROCKETS_WITH_LAUNCHES
} from '../actions/types';

const initialState = {
  allRockets: [],
  allRocketsWithLaunches: []
};

const RocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROCKETS:
      return {
        ...state,
        allRockets: [...action.value],
      };
    case GET_ALL_ROCKETS_WITH_LAUNCHES:
      return {
        ...state,
        allRocketsWithLaunches: [...action.value],
      };
    default:
      return state;
  }
};

export default RocketsReducer;
