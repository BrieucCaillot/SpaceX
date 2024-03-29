import axios from 'axios';

import {
  GET_ALL_MISSIONS,
  GET_ALL_LAUNCHES,
  GET_ALL_ROCKETS,
  SET_RENDERER,
  SET_SCENE,
  SET_CAMERA,
  SET_ROCKETS_SECTIONS
} from './types';

export const getAllMissions = () => (dispatch) => {

  new Promise((resolve) => {
    axios.get('https://api.spacexdata.com/v3/missions')
    .then(res => {
      dispatch({
        type: GET_ALL_MISSIONS,
        value: res.data
      });
    }).catch(err => {
      console.log(err);
    })
  })

};

export const getAllLaunches = () => (dispatch) => new Promise((resolve) => {
  axios.get('https://api.spacexdata.com/v3/launches')
  .then(res => {
    dispatch({
      type: GET_ALL_LAUNCHES,
      value: res.data
    });
    resolve()
  }).catch(err => {
    console.log(err);
  })
});

export const getAllRockets = () => (dispatch) => new Promise((resolve) => {
  axios.get('https://api.spacexdata.com/v3/rockets')
  .then(res => {
    dispatch({
      type: GET_ALL_ROCKETS,
      value: res.data
    });
    resolve()
  }).catch(err => {
    console.log(err);
  })
});

export const setRenderer = (renderer) => (dispatch) => {
  dispatch({
    type: SET_RENDERER,
    value: renderer
  })
}

export const setScene = (scene) => (dispatch) => {
  dispatch({
    type: SET_SCENE,
    value: scene
  })
}

export const setCamera = (camera) => (dispatch) => {
  dispatch({
    type: SET_CAMERA,
    value: camera
  })
}

export const setRocketSections= (rocketSection) => (dispatch) => {
  dispatch({
    type: SET_ROCKETS_SECTIONS,
    value: rocketSection
  })
}
