import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import RocketBillboard from './RocketBillboard';
import RocketModel from './RocketModel';

const Rocket = ({rocket, index}) => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene } = ThreeState;

  useEffect(() => {
    console.log('rocket', rocket)
  }, [scene])

  return (
    <>
      <RocketBillboard {...rocket} />
      <RocketModel {...rocket} />
    </>
  )
}

export default Rocket;
