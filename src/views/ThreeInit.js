import React from 'react';
import ThreeScene from '../components/three/ThreeScene';
import ThreeRenderer from '../components/three/ThreeRenderer';
import ThreeCamera from '../components/three/ThreeCamera';
import ThreeRaf from '../components/three/ThreeRaf';
import ThreeLight from '../components/three/ThreeLights';

const ThreeInit = () => {

  return (
    <>
      <ThreeRenderer />
      <ThreeScene />
      <ThreeCamera />
      <ThreeLight />
      <ThreeRaf />
    </>
  )
}

export default ThreeInit;
