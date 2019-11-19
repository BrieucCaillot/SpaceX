import {
  GET_ALL_MISSIONS,
  GET_ALL_ROCKETS,
  GET_ALL_LAUNCHES,
  GET_ALL_ROCKETS_WITH_LAUNCHES,
} from '../actions/types';

const initialState = {
  allRockets: [],
  allLaunches: [],
  allMissions: [],
  allRocketsWithLaunches: []
};

const SpaceXReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MISSIONS:
      return {
        ...state,
        allMissions: [...action.value],
      };
    case GET_ALL_ROCKETS:
      return {
        ...state,
        allRockets: [...action.value],
      };
    case GET_ALL_LAUNCHES:
      return {
        ...state,
        allLaunches: [...action.value],
      };
    case GET_ALL_ROCKETS_WITH_LAUNCHES:
      const {allLaunches, allRockets} = state;

      allLaunches.reduce((r, a) => {
        r[a.rocket.rocket_id] = r[a.rocket.rocket_id] || [];
        r[a.rocket.rocket_id].push(a);
        return r;
      }, []);


      for (let rocket of allRockets) {
        rocket['launches'] = []
        for (let launch of allLaunches) {
          if (rocket.rocket_id === launch.rocket.rocket_id) {
            rocket.launches.push(launch)
          }
        }
      }

      return {
        ...state,
        allRocketsWithLaunches: allRockets
      }

    default:
      return state;
  }
};

export default SpaceXReducer;
