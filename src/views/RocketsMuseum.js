import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ThreeInit from '../components/ThreeInit';
import Grid from '../components/three/Grid';
import Rockets from '../components/Rockets';
import Loading from '../components/Loading';
import Navigation from '../components/Navigation';

const RocketsMuseum = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene, camera, renderer, rocketSections } = ThreeState;

  return (
    <>
      <Header />
      {
        scene == null ||
        camera == null ||
        renderer == null ||
        rocketSections.children.length !== 4 &&
        <Loading />
      }

      <Navigation />
      <ThreeInit />
      {scene && <Grid />}
      {scene && <Rockets />}
    </>
  )
}

export default RocketsMuseum;
