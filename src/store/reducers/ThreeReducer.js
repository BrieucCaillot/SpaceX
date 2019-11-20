import * as THREE from 'three';
import {
  SET_RENDERER,
  SET_SCENE,
  SET_CAMERA, SET_ROCKETS_SECTIONS
} from '../actions/types';

const initialState = {
  renderer: null,
  scene: null,
  camera: null,
  rocketSections: new THREE.Group()
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
    case SET_ROCKETS_SECTIONS:
      state.rocketSections.add(action.value)
      return {
        ...state
      };
    default:
      return state;
  }
};

export default RocketsReducer;
