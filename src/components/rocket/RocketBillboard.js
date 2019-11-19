import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';

import PlaneFragment from '../../shaders/PlaneFragment';
import PlaneVertex from '../../shaders/PlaneVertex';
import grid from '../../assets/grid.fbx';

import { TweenLite } from "gsap";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import createCanTex from '../../classes/createCanTex';

const RocketBillboard = ({ rocket_id, flickr_images }) => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene } = ThreeState;

  let planeCenter = {};
  let uniforms = {};
  let time = 0.8;

  useEffect(() => {
    if (scene) {
      loadPlaneCenter()
      createTopPlane(rocket_id)
      createBotPlane(rocket_id)
    }

  }, [scene])

  const loadPlaneCenter = () => {
    new FBXLoader().load(grid, (obj) => {
      createBillboard(obj.children[0])
    })
  }

  const createBillboard = (obj) => {
    planeCenter = obj
    const texture = new THREE.TextureLoader().load(flickr_images[0])
    uniforms = {
      u_tex: {
        type: 't',
        value: texture
      },
      u_delta: {
        type: 'f',
        value: 0
      },
      u_h: {
        type: 'f',
        value: 0
      },
      u_alpha: {
        type: 'f',
        value: -1.
      },
    }
    const s = 0.5
    planeCenter.scale.set(s, s, s)
    planeCenter.translateY(0.3)
    planeCenter.rotateX(Math.PI / 2)
    planeCenter.rotateZ(Math.PI)
    planeCenter.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: PlaneVertex,
      fragmentShader: PlaneFragment,
      transparent: true
    })
    // console.log('planeCenter', planeCenter)
    scene.add(planeCenter)
  }

  const createTopPlane = (topText) => {
    let tex = new THREE.CanvasTexture(createCanTex(topText, true))
    let planeTop = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true
    }))
    tex.needsUpdate = true
    planeTop.position.set(0.55, 0.5, 0)
    scene.add(planeTop)
  }

  const createBotPlane = (botText) => {
    let tex = new THREE.CanvasTexture(createCanTex(botText, true))
    let planeTop = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      side: THREE.DoubleSide
    }))
    tex.needsUpdate = true
    planeTop.position.set(0.55, -0.55, 0)
    scene.add(planeTop)
  }

  const mouseIn = () => {
    TweenLite.to(uniforms.u_h, time / 2, {
      value: -4.0
    })
    TweenLite.to(uniforms.u_h, time / 2, {
      value: 0,
      delay: time / 2
    })
  }

  const mouseOut = () => {
    TweenLite.to(uniforms.u_h, time / 2, {
      value: -4.0
    })
    TweenLite.to(uniforms.u_h, time / 2, {
      value: 0,
      delay: time / 2
    })
  }

  const onClick = () => {
    TweenLite.to(uniforms.u_alpha, time / 2, {
      value: 2.
    })
  }

  const onBack = () => {
    TweenLite.to(uniforms.u_alpha, time / 2, {
      value: -1.
    })
  }

  const update = (delta) => {
    if (planeCenter)
      uniforms.u_delta.value += 1
  }


  return null
}

export default RocketBillboard;
