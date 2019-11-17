import React, { Component } from "react";
import * as THREE from "three";

import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import OrbitControls from "orbit-controls-es6";

import Grid from '../classes/Grid'
import BillBoard from '../classes/BillBoard'

import Rockets from '../views/Rockets';

class Home extends Component {

  constructor(props) {
    super(props)
    this.renderer = null
    this.scene = null
    this.camera = null

    this.controls = null
    this.textureLoader = null

    this.billBoard = null
    this.grid = null

    this.oldDate = 0
    this.newDate = 0;
    this.delta = 0

    this.composer = null
    this.bloomPass = null
  }

  componentDidMount() {

    this.initRenderer()
    this.initScene()
    this.initCamera()
    this.initControls()
    this.initPostProcessing()
    this.initLights()
    this.initGUI()
    this.handleListeners()

    this.textureLoader = new THREE.TextureLoader()

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "http://via.placeholder.com/900"

    this.grid = new Grid(this.scene, this.textureLoader)
    this.billBoard = new BillBoard(this.scene, this.textureLoader, img)

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
  }

  initScene() {
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xFFFFFF, 8, 10)
    scene.background = new THREE.Color(0xFFFFFF)
    this.scene = scene
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0.5, 4)
    this.camera = camera
  }

  initControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.enabled = true
    controls.maxDistance = 1500
    controls.minDistance = 0
    this.controls = controls
  }

  initPostProcessing() {
    const composer = new EffectComposer(this.renderer);
    composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),
      3,
      1,
      0.9);
    composer.addPass(this.bloomPass);
    this.composer = composer
  }

  initLights() {
    const light = new THREE.AmbientLight()
    const pointLight = new THREE.PointLight()
    pointLight.position.set(10, 10, 0)
    this.scene.add(light, pointLight)
  }

  initGUI() {
    var params = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 0,
      bloomRadius: 0
    };

    var gui = new GUI();

    gui.add(params, "bloomThreshold", 0.0, 1.0).onChange(value => {
      this.bloomPass.threshold = Number(value);
    });

    gui.add(params, "bloomStrength", 0.0, 3.0).onChange(value => {
      this.bloomPass.strength = Number(value);
    });

    gui.add(params, "bloomRadius", 0.0, 1.0).step(0.01).onChange(value => {
      this.bloomPass.radius = Number(value);
    });
  }

  handleListeners() {
    window.addEventListener("resize", () => this.resizeCanvas())
  }

  update() {
    // this.composer.render();
    this.renderer.render(this.scene, this.camera)
    this.billBoard.update(this.getDelta())
  }

  getDelta() {
    this.newDate = Date.now()
    this.delta = this.newDate - this.oldDate;
    this.oldDate = this.newDate;

    return this.delta
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  render() {
    return (
      <>
        <div ref={ref => (this.mount = ref)} />
        <Rockets />
      </>
    )
  }
}

export default Home;
