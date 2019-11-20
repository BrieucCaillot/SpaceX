import { useEffect } from "react";
import {useDispatch} from "react-redux";
import * as THREE from "three";

import { setScene } from '../../store/actions';

const ThreeScene = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xFFFFFF, 8, 10)
    scene.background = new THREE.Color(0xFFFFFF)
    dispatch(setScene(scene))
    console.log('scene')
  }, [])

  return null

}

export default ThreeScene;
