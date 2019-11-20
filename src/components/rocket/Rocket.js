import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as THREE from 'three';

import RocketBillboard from './RocketBillboard';
import RocketModel from './RocketModel';
import { SET_ROCKETS_SECTIONS } from '../../store/actions/types';

const Rocket = ({ rocket, position }) => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene, rocketSections } = ThreeState;

  const dispatch = useDispatch()

  const [rocketSection] = useState(new THREE.Group())

  useEffect(() => {
    rocketSection.position.x = position;
    setTimeout(() => {
      rocketSection.position.x = position;
      dispatch({
        type: SET_ROCKETS_SECTIONS,
        value: rocketSection
      })
      if (rocketSections.children.length === 4) {
        scene.add(rocketSections)
      }
    }, 3000)

  }, [])


  return (
    <>
      <RocketBillboard rocket={rocket} rocketSection={rocketSection} />
      <RocketModel rocket={rocket} rocketSection={rocketSection} />
    </>
  )
}

export default Rocket;
