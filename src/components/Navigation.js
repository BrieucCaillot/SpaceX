import React, { useEffect } from 'react';
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
    // console.log('rayFlag', rayFlag)
    // if (rayFlag) {
    // document.querySelector('.previous').classList.add('on')
    // document.querySelector('.next').classList.add('on')
    // setTimeout(() => {
    //   document.querySelector('.back').classList.remove('on')
    // }, 400)
    if (!prezFlag) {
      prezMode()
    } else {
      back()
    }
    backFlag = true
    rocketSections.children[positionIndex].onClick()
    // }
  }

  const backClicked = () => {
    if (backFlag) {
      console.log('backclicked')
      document.querySelector('.back').classList.add('on')
      setTimeout(() => {
        document.querySelector('.next').classList.remove('on')
        document.querySelector('.previous').classList.remove('on')
      }, 400)
      if (!prezFlag) {
        prezMode()
      } else {
        back()
      }
      rocketSections.children[positionIndex].onBack()
    }
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
    console.log('back')
    TweenLite.to(rocketSections.position, 0.5, {
      z: 0,
      x: positionIndex * -stepSize,
      y: 0,
    })

  }

  const prezMode = () => {
    prezFlag = true
    console.log('prezmode')
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

  // const raycast = () => {
  //   // rayFlag = false
  //   for (let j = 0; j < 3; j++) {
  //     // raycaster.setFromCamera(mousePos, camera);
  //     console.log('scene children', scene.children)
  //     // var intersects = raycaster.intersectObjects(scene.children[3].children[j].children);
  //     // for (var i = 0; i < intersects.length; i++) {
  //     rayFlag = true
  //     // }
  //   }
  // }

  const raycast = () => {
    rayFlag = false
    for (let j = 0; j < 3; j++) {
      // raycaster.setFromCamera(mousePos, camera);
      // console.log(camera)
      var intersects = raycaster.intersectObjects(rocketSections.children[j].children);
      for (var i = 0; i < intersects.length; i++) {
        rayFlag = true
      }
    }
  }

  return (
    <div className="navigation">
      {/*<div className="back on">*/}
      {/*  <img onClick={() => backClicked()} src={arrow} alt="back"></img>*/}
      {/*</div>*/}
      {/*<div className="arrows">*/}
      {/*  <img onClick={() => moveToRight()}*/}
      {/*       src={arrowLeft}*/}
      {/*       className="previous"*/}
      {/*       alt="arrow-left"></img>*/}
      {/*  <img onClick={() => moveToLeft()} src={arrowRight} className="next" alt="arrow-right"></img>*/}
      {/*</div>*/}
    </div>
  )
}

export default Navigation;
