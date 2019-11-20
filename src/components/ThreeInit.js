import React from 'react';
import { useSelector } from 'react-redux';
import ThreeScene from './three/ThreeScene';
import ThreeRenderer from './three/ThreeRenderer';
import ThreeCamera from './three/ThreeCamera';
import ThreeRaf from './three/ThreeRaf';
import ThreeLight from './three/ThreeLights';

const ThreeInit = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { renderer, scene, camera} = ThreeState;

  return (
    <>
      <ThreeCamera />
      <ThreeScene />
      <ThreeLight />
      {camera && <ThreeRenderer />}
      {renderer && scene && camera && <ThreeRaf />}
    </>
  )
}

export default ThreeInit;
