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

  const [rocketSection, setRocketSection] = useState(new THREE.Group())

  useEffect(() => {
    if (rocketSection.children.length >= 2) {
      rocketSection.position.x = position;
      dispatch({
        type: SET_ROCKETS_SECTIONS,
        value: rocketSection
      })
      if (rocketSections.children.length == 4) {
        scene.add(rocketSections)
      }
    }
  }, [scene, rocketSection])

  return (
    <>
      <RocketBillboard rocket={rocket} rocketSection={rocketSection} />
      <RocketModel rocket={rocket} rocketSection={rocketSection} />
    </>
  )
}

export default Rocket;
