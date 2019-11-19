import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const RocketModel = ({rocket_id}) => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene } = ThreeState;

  useEffect(() => {
    loadModel()
  }, [scene])

  const loadModel = () => {
    let url = '/rockets/' + rocket_id + '.glb'
    console.log(url)
    new GLTFLoader().load(url, modelLoaded)
  }

  const modelLoaded = (obj) => {
    let rocket = obj.scene;
    if (rocket_id === 'falconHeavy') {
      let s = 0.04
      rocket.scale.set(s, s, s)
      rocket.rotateY(Math.PI / 2)
      rocket.position.set(-0.7, -0.9, 0)
    } else {
      let s = 0.07
      rocket.scale.set(s, s, s)
      rocket.position.set(-0.7, -0.8, 0)
    }
    scene.add(rocket)
  }

  return null
}

export default RocketModel;
