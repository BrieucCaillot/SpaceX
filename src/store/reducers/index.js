import { combineReducers } from 'redux';
import MissionsReducer from './MissionsReducer';
import LaunchesReducer from './LaunchesReducer';
import RocketsReducer from './RocketsReducer';

export default combineReducers({
  MissionsReducer,
  LaunchesReducer,
  RocketsReducer
});
