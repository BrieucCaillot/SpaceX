import {
  GET_ALL_MISSIONS
} from '../actions/types';

const initialState = {
  allMissions: [],
};

const MissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MISSIONS:
      return {
        ...state,
        allMissions: [...action.value],
      };
    default:
      return state;
  }
};

export default MissionsReducer;
