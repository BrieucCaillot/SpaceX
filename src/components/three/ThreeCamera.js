import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";

import { setCamera } from '../../store/actions';

const ThreeCamera = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000)
    camera.position.set(0, 0, 4)
    dispatch(setCamera(camera))
    window.camera = camera
  }, [])

  return null

}

export default ThreeCamera;
