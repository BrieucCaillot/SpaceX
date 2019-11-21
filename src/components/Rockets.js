import React from 'react';
import { useSelector } from 'react-redux';

import Rocket from './rocket/Rocket';

const Rockets = () => {

  const SpaceXState = useSelector(state => state.SpaceXReducer)
  const { allRocketsWithLaunches } = SpaceXState;

  return (
    <>
      {
        allRocketsWithLaunches.map((rocket, index) => (
          <Rocket key={index}
                  rocket={rocket}
                  index={index}
                  position={allRocketsWithLaunches.length * index} />
        ))
      }
    </>
  )
}

export default Rockets;
