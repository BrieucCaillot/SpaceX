import React, { useState, useEffect } from 'react';
import Rocket from '../components/Rocket';
import { connect } from 'react-redux';

const Rockets = ({allRocketsWithLaunches}) => {

  return (
    <>
      {
        allRocketsWithLaunches.map((rocket, index) => (
          <Rocket key={index} {...rocket} />
        ))
      }
    </>
  )
}

const mapStateToProps = (state) => {
  const { allRocketsWithLaunches } = state.SpaceXReducer;
  return { allRocketsWithLaunches };
};


export default connect(mapStateToProps)(Rockets);
