import {
  SET_RENDERER,
  SET_SCENE,
  SET_CAMERA
} from '../actions/types';

const initialState = {
  renderer: null,
  scene: null,
  camera: null,
};

const RocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RENDERER:
      return {
        ...state,
        renderer: action.value,
      };
    case SET_SCENE:
      return {
        ...state,
        scene: action.value,
      };
    case SET_CAMERA:
      return {
        ...state,
        camera: action.value,
      };
    default:
      return state;
  }
};

export default RocketsReducer;
