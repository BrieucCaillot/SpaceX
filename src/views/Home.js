import React, { Component } from "react";
import { connect } from 'react-redux';
import * as THREE from "three";
import '../scss/views/_home.scss'

// import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Grid from '../classes/Grid'
import RocketSection from '../classes/RocketSection'
import AnimationController from '../classes/AnimationController'

import { setRenderer, setCamera, setScene } from '../store/actions';

import Rockets from '../views/Rockets';
import arrow from '../assets/arrow.svg'
import arrowLeft from '../assets/arrowLeft.svg'
import arrowRight from '../assets/arrowRight.svg'
import SpaceXLogo from '../assets/spaceXLogo.png'

class Home extends Component {

  constructor(props) {
    super(props)

    this.renderer = null
    this.scene = null
    this.camera = null

    this.controls = null
    this.textureLoader = null

    this.grid = null
    this.rocketSections = []
    this.rocketSectionsGroup = new THREE.Group()

    this.mousePos = new THREE.Vector2();

    this.raycaster = new THREE.Raycaster();
    this.rayFlag = false
    this.animFlag = false

    this.animationController = null

    this.oldDate = 0
    this.newDate = 0;
    this.delta = 0
  }

  componentDidMount() {

    // this.initRenderer()
    // this.initScene()
    // this.initCamera()
    // this.initLights()
    this.handleListeners()

    this.textureLoader = new THREE.TextureLoader()

    this.grid = new Grid(this.scene, this.textureLoader)

    let stepSize = 4;
    for (let i = 0; i < 3; i++) {
      this.rocketSections.push(new RocketSection(this.rocketSectionsGroup, this.textureLoader, "starship", 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', "Hallo ?", "Ouais ouais trql"))
      this.rocketSections[i].rocketSection.position.x = stepSize * i;
    }
    this.scene.add(this.rocketSectionsGroup)
    this.animationController = new AnimationController(this.rocketSectionsGroup, stepSize)

    let animate = () => {
      requestAnimationFrame(animate);
      this.update();
    };

    animate();
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.debug.checkShaderErrors = true
    this.mount.appendChild(renderer.domElement);
    this.renderer = renderer
    this.props.setRenderer(renderer)
    console.log(this.props)
  }

  initScene() {
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xFFFFFF, 8, 10)
    scene.background = new THREE.Color(0xFFFFFF)
    this.scene = scene
    this.props.setScene(scene)
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 4)
    this.camera = camera
    this.props.setCamera(camera)
  }

  initControls() {
    const controls = new OrbitControls(this.camera, this.props.renderer.domElement)
    controls.enabled = true
    controls.maxDistance = 1500
    controls.minDistance = 0
    this.controls = controls
  }


  initLights() {
    const light = new THREE.AmbientLight()
    const pointLight = new THREE.PointLight()
    pointLight.position.set(10, 10, 0)
    this.scene.add(light, pointLight)
  }


  backClicked() {
    if (this.backFlag) {
      document.querySelector('.back').classList.add('on')
      setTimeout(() => {
        document.querySelector('.next').classList.remove('on')
        document.querySelector('.previous').classList.remove('on')
      }, 400)
      this.animationController.back()
      this.rocketSections.forEach(rocketSection => {
        rocketSection.billBoard.onBack()
      });
    }
  }


  leftClicked() {
    this.animationController.moveToRight()
  }

  rightClicked() {
    this.animationController.moveToLeft()
  }

  onClick = () => {
    if (this.rayFlag) {
      document.querySelector('.previous').classList.add('on')
      document.querySelector('.next').classList.add('on')
      setTimeout(() => {
        document.querySelector('.back').classList.remove('on')
      }, 400)
      this.animationController.prezMode()
      this.backFlag = true
      this.rocketSections.forEach(rocketSection => {
        rocketSection.billBoard.onClick()
      });
    }
  }

  handleListeners() {
    window.addEventListener("resize", () => this.resizeCanvas())
    window.addEventListener('resize', this.resizeCanvas)
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('click', this.onClick)
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 39) {
        this.animationController.moveToLeft()
      } else if (e.keyCode === 37) {
        this.animationController.moveToRight()
      }
    })
  }

  update() {
    this.props.renderer.render(this.scene, this.camera)
    this.camera.lookAt(0, 0, 0)
    this.camera.position.x += (this.mousePos.x / 5 - this.camera.position.x) * 0.05
    this.camera.position.y += (-this.mousePos.y / 5 - this.camera.position.y) * 0.05

    for (let i = 0; i < this.rocketSections.length; i++) {
      this.rocketSections[i].update(this.getDelta())
    }
  }

  mouseMove = (e) => {
    this.mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mousePos.y = - (e.clientY / window.innerHeight) * 2 + 1;

    this.raycast()
    if (this.rayFlag === true && this.animFlag === false) {
      this.animationController.moveForward()
      for (let i = 0; i < this.rocketSections.length; i++) {
        this.rocketSections[i].mouseIn()
      }
      this.animFlag = true
    }
    if (this.rayFlag === false && this.animFlag === true) {
      this.animationController.moveBackward()
      for (let i = 0; i < this.rocketSections.length; i++) {
        this.rocketSections[i].mouseOut()
      }
      this.animFlag = false
    }
  }

  raycast = () => {
    this.rayFlag = false
    for (let j = 0; j < 3; j++) {
      this.raycaster.setFromCamera(this.mousePos, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children[3].children[j].children);
      for (var i = 0; i < intersects.length; i++) {
        this.rayFlag = true
      }
    }
  }

  getDelta() {
    this.newDate = Date.now()
    this.delta = this.newDate - this.oldDate;
    this.oldDate = this.newDate;

    return this.delta
  }

  resizeCanvas = () => {
    this.props.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  render() {
    return (
      <>
        <div ref={ref => (this.mount = ref)} />
        <img src={SpaceXLogo} className="logo"></img>
        <div className="back on">
          <img onClick={() => this.backClicked()} src={arrow}></img>
        </div>
        <div className="arrows">
          <img onClick={() => this.leftClicked()} src={arrowLeft} className="previous"></img>
          <img onClick={() => this.rightClicked()} src={arrowRight} className="next"></img>
        </div>
        <Rockets />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    setRenderer: (renderer) => dispatch(setRenderer(renderer)),
    setScene: (scene) => dispatch(setScene(scene)),
    setCamera: (camera) => dispatch(setCamera(camera)),
  }
}

const mapStateToProps = (state) => {
  const { renderer, scene, camera } = state.ThreeReducer;
  return { renderer, scene, camera };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
