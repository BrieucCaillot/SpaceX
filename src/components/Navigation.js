import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { TweenLite } from "gsap";

const Navigation = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { rocketSections } = ThreeState;

  const stepSize = rocketSections.children.length;
  const mousePos = new THREE.Vector2();
  let prezFlag = false
  let backFlag = false
  let positionIndex = 0;

  let rayFlag = false
  let animFlag = false

  useEffect(() => {
    if (stepSize == 4) {
      window.addEventListener('mousemove', mouseMove)
      window.addEventListener('click', onClick)
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [stepSize])

  const onKeyDown = (e) => {
    if (e.keyCode === 39) moveToLeft()
    if (e.keyCode === 37) moveToRight()
  }

  const onClick = () => {
    if (!prezFlag) {
      prezMode()
    } else {
      back()
    }
    backFlag = true
    rocketSections.children[positionIndex].onClick()
  }

  const moveToLeft = () => {
    if (!prezFlag) {
      if (positionIndex < stepSize - 1) {
        positionIndex++;
        TweenLite.to(rocketSections.position, 1, {
          x: positionIndex * -stepSize
        })
      }
    }
  }

  const moveToRight = () => {
    if (!prezFlag) {
      if (positionIndex > 0) {
        positionIndex--;
        TweenLite.to(rocketSections.position, 1, {
          x: positionIndex * -stepSize
        })
      }
    }
  }

  const moveForward = () => {
    if (!prezFlag) {
      TweenLite.to(rocketSections.position, 0.5, {
        z: 0.2
      })
    }
  }

  const moveBackward = () => {
    if (!prezFlag) {
      TweenLite.to(rocketSections.position, 0.5, {
        z: 0
      })
    }
  }

  const back = () => {
    prezFlag = false
    TweenLite.to(rocketSections.position, 0.5, {
      z: 0,
      x: positionIndex * -stepSize,
      y: 0,
    })
  }

  const prezMode = () => {
    prezFlag = true
    TweenLite.to(rocketSections.position, 0.5, {
      z: 2,
      x: 0.3 + positionIndex * -stepSize,
      y: -0.3,
    })
  }

  const mouseMove = (e) => {
    if (rocketSections.children[positionIndex]) {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
      // raycast()
      if (animFlag === false) {
        moveForward()
        rocketSections.children[positionIndex].mouseIn()
        animFlag = true
      }
      if (rayFlag === false && animFlag === true) {
        moveBackward()
        rocketSections.children[positionIndex].mouseOut()
        animFlag = false
      }
    }
  }

  return null
}

export default Navigation;
