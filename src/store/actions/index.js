import axios from 'axios';

import {
  GET_ALL_MISSIONS,
  GET_ALL_LAUNCHES,
  GET_ALL_ROCKETS,
} from './types';

export const getAllMissions = () => (dispatch) => {

  axios.get('https://api.spacexdata.com/v3/missions')
  .then(res => {
    dispatch({
      type: GET_ALL_MISSIONS,
      value: res.data
    });
  }).catch(err => {
    console.log(err);
  })

};

export const getAllLaunches = () => (dispatch) => {

  axios.get('https://api.spacexdata.com/v3/launches')
  .then(res => {
    dispatch({
      type: GET_ALL_LAUNCHES,
      value: res.data
    });
  }).catch(err => {
    console.log(err);
  })

};

export const getAllRockets = () => (dispatch) => {

  axios.get('https://api.spacexdata.com/v3/rockets')
  .then(res => {
    dispatch({
      type: GET_ALL_ROCKETS,
      value: res.data
    });
  }).catch(err => {
    console.log(err);
  })

};
