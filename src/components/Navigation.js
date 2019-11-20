import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { TweenLite } from "gsap";

import arrow from '../assets/images/arrow.svg'
import arrowLeft from '../assets/images/arrowLeft.svg'
import arrowRight from '../assets/images/arrowRight.svg'

const Navigation = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene, camera, rocketSections } = ThreeState;

  const stepSize = rocketSections.children.length;
  const mousePos = new THREE.Vector2();
  let prezFlag = false
  let backFlag = false
  let positionIndex = 0;

  const raycaster = new THREE.Raycaster();
  let rayFlag = false
  let animFlag = false

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('click', onClick)
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 39) {
        moveToLeft()
      } else if (e.keyCode === 37) {
        moveToRight()
      }
    })
  })

  const onClick = () => {
    if (rayFlag) {
      document.querySelector('.previous').classList.add('on')
      document.querySelector('.next').classList.add('on')
      setTimeout(() => {
        document.querySelector('.back').classList.remove('on')
      }, 400)
      prezMode()
      backFlag = true
      rocketSections.forEach(rocketSection => {
        rocketSection.onClick()
      });
    }
  }

  const backClicked = () => {
    if (backFlag) {
      document.querySelector('.back').classList.add('on')
      setTimeout(() => {
        document.querySelector('.next').classList.remove('on')
        document.querySelector('.previous').classList.remove('on')
      }, 400)
      back()
      rocketSections.forEach(rocketSection => {
        rocketSection.onBack()
      });
    }
  }


  const moveToLeft = () => {
    if (!prezFlag) {
      if (positionIndex < 3) {
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
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = - (e.clientY / window.innerHeight) * 2 + 1;
    // raycast()
    if (rayFlag === true && animFlag === false) {
      moveForward()
      for (let i = 0; i < rocketSections.length; i++) {
        rocketSections[i].mouseIn()
      }
      animFlag = true
    }
    if (rayFlag === false && animFlag === true) {
      moveBackward()
      for (let i = 0; i < rocketSections.length; i++) {
        rocketSections[i].mouseOut()
      }
      animFlag = false
    }
  }

  const raycast = () => {
    // rayFlag = false
    for (let j = 0; j < 3; j++) {
      // raycaster.setFromCamera(mousePos, camera);
      console.log('scene', scene.children)
      // var intersects = raycaster.intersectObjects(scene.children[3].children[j].children);
      // for (var i = 0; i < intersects.length; i++) {
        rayFlag = true
      // }
    }
  }

  return (
    <div className="navigation">
      <div className="back on">
        <img onClick={() => backClicked()} src={arrow} alt="back"></img>
      </div>
      <div className="arrows">
        <img onClick={() => moveToRight()} src={arrowLeft} className="previous" alt="arrow-left"></img>
        <img onClick={() => moveToLeft()} src={arrowRight} className="next" alt="arrow-right"></img>
      </div>
    </div>
  )
}

export default Navigation;
