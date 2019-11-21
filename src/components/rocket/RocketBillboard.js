import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';

import PlaneFragment from '../../shaders/PlaneFragment';
import PlaneVertex from '../../shaders/PlaneVertex';
import grid from '../../assets/grid.fbx';

import { TweenLite } from "gsap";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import createCanTex from '../../classes/createCanTex';

const RocketBillboard = ({ rocket, rocketSection }) => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene } = ThreeState;

  let planeCenter = useRef({});
  let uniforms = useRef({});
  let time = 0.8;

  useEffect(() => {
    if (scene) {
      loadPlaneCenter()
      createTopPlane(rocket.rocket_name)
      createBotPlane(rocket.rocket_name)
    }
  }, [scene])

  const loadPlaneCenter = () => {
    new FBXLoader().load(grid, (obj) => {
      createBillboard(obj.children[0])
    })
  }

  const createBillboard = (obj) => {
    planeCenter.current = obj
    const texture = new THREE.TextureLoader().load(rocket.flickr_images[0])
    uniforms.current = {
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
    planeCenter.current.scale.set(s, s, s)
    planeCenter.current.translateY(0.3)
    planeCenter.current.rotateX(Math.PI / 2)
    planeCenter.current.rotateZ(Math.PI)
    planeCenter.current.material = new THREE.ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader: PlaneVertex,
      fragmentShader: PlaneFragment,
      transparent: true
    })
    planeCenter.current.name = 'placeCenter'

    // console.log('planeCenter', planeCenter)
    rocketSection.add(planeCenter.current)
  }

  const createTopPlane = (topText) => {
    let tex = new THREE.CanvasTexture(createCanTex(topText, true))
    let planeTop = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true
    }))
    tex.needsUpdate = true
    planeTop.position.set(0.55, 0.5, 0)
    planeTop.name = 'planeTop'
    rocketSection.add(planeTop)
  }

  const createBotPlane = (botText) => {
    let tex = new THREE.CanvasTexture(createCanTex(botText, true))
    let planeBot = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      side: THREE.DoubleSide
    }))
    tex.needsUpdate = true
    planeBot.position.set(0.55, -0.55, 0)
    planeBot.name = 'planeBot'
    rocketSection.add(planeBot)
  }

  const onClick = () => {}
  rocketSection.onClick = () => {
    TweenLite.to(uniforms.current.u_alpha, time / 2, {
      value: 2.
    })
  }

  const update = () => {}
  rocketSection.update = () => {
    if (uniforms.current.u_delta) {
      uniforms.current.u_delta.value += 1
    }
  }

  const onBack = () => {}
  rocketSection.onBack = () => {
    TweenLite.to(uniforms.current.u_alpha, time / 2, {
      value: -1.
    })
  }

  const mouseIn = () => {
  }
  rocketSection.mouseIn = () => {
    TweenLite.to(uniforms.current.u_h, time / 2, {
      value: -4.0
    })
    TweenLite.to(uniforms.current.u_h, time / 2, {
      value: 0,
      delay: time / 2
    })
  }

  const mouseOut = () => {
  }
  rocketSection.mouseOut = () => {
    TweenLite.to(uniforms.current.u_h, time / 2, {
      value: -4.0
    })
    TweenLite.to(uniforms.current.u_h, time / 2, {
      value: 0,
      delay: time / 2
    })
  }

  return null
}

export default RocketBillboard;
