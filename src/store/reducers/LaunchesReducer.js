import {
  GET_ALL_LAUNCHES
} from '../actions/types';

const initialState = {
  allLaunches: [],
};

const LaunchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LAUNCHES:
      return {
        ...state,
        allLaunches: [...action.value],
      };
    default:
      return state;
  }
};

export default LaunchesReducer;
