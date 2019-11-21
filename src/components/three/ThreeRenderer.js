import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";

import { setRenderer } from '../../store/actions';

const ThreeRenderer = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { camera } = ThreeState;

  const dispatch = useDispatch()
  let refContainer = null;

  const renderer = new THREE.WebGLRenderer({ antialias: true })

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.debug.checkShaderErrors = true
    refContainer.appendChild(renderer.domElement);
    dispatch(setRenderer(renderer))

    window.addEventListener('resize', resizeCanvas)
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const resizeCanvas = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }

  return <div className="canvas__container" ref={(ref) => refContainer = ref}></div>

}

export default ThreeRenderer;
