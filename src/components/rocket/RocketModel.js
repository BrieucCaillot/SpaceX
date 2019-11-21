import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const RocketModel = ({ rocket, rocketSection }) => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene } = ThreeState;

  useEffect(() => {
    loadModel()
  }, [scene])

  const loadModel = () => {
    let url = '/rockets/' + rocket.rocket_id + '.glb'
    // console.log(url)
    new GLTFLoader().load(url, modelLoaded)
  }

  const modelLoaded = (obj) => {
    let rocketOBJ = obj.scene;
    rocketOBJ.rotateY(Math.PI)
    if (rocket.rocket_id === 'falcon1') {
      let s = 0.03
      rocketOBJ.scale.set(s, s, s)
      rocketOBJ.position.set(-0.7, -0.8, 0)
    } else {
      let s = 0.13
      rocketOBJ.scale.set(s, s, s)
      rocketOBJ.position.set(-0.7, -0.8, 0)
    }
    rocketSection.add(rocketOBJ)
  }

  return null
}

export default RocketModel;
