import * as THREE from 'three'

import PlaneFragment from '../shaders/PlaneFragment'
import PlaneVertex from '../shaders/PlaneVertex'

import { TweenLite } from "gsap";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import grid from '../assets/grid.fbx'
import createCanTex from './createCanTex'

export default class Billboard {
    constructor(scene, textureLoader, url, topText, botText) {
        this.bind()
        this.scene = scene
        this.url = url
        this.textureLoader = textureLoader
        this.fbxLoader = new FBXLoader()
        this.texture = null
        this.planeCenter = null
        this.planeTop = null
        this.planeBottom = null
        this.uniforms = null
        this.time = 0.8;

        this.uvInt = new THREE.Vector2()

        this.loadPlaneCenter()
        this.createTopPlane(topText)
        this.createBotPlane(botText)
    }

    loadPlaneCenter() {
        this.fbxLoader.load(grid, (obj) => {
            this.createBillboard(obj.children[0])
        })
    }

    updateUv(uvInt) {
        this.uvInt = uvInt
        this.uniforms.u_intUv.value = uvInt
    }

    createBillboard(obj) {
        this.planeCenter = obj
        this.texture = this.textureLoader.load(this.url)
        this.uniforms = {
            u_tex: {
                type: 't',
                value: this.texture
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
            u_intUv: {
                type: 'vec2',
                value: this.uvInt
            },
        }
        let s = 0.5
        this.planeCenter.scale.set(s, s, s)
        this.planeCenter.translateY(0.3)
        this.planeCenter.rotateX(Math.PI / 2)
        this.planeCenter.rotateZ(Math.PI)
        this.planeCenter.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: PlaneVertex,
            fragmentShader: PlaneFragment,
            transparent: true
        })
        console.log(this.planeCenter)
        this.planeCenter.name = "center"
        this.scene.add(this.planeCenter)


    }

    createTopPlane(topText) {

        let tex = new THREE.CanvasTexture(createCanTex(topText, true))
        this.planeTop = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true
        }))
        tex.needsUpdate = true
        this.planeTop.position.set(0.55, 0.5, 0)
        this.scene.add(this.planeTop)
    }

    createBotPlane(botText) {

        let tex = new THREE.CanvasTexture(createCanTex(botText))
        this.planeTop = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            side: THREE.DoubleSide
        }))
        tex.needsUpdate = true
        this.planeTop.position.set(0.55, -0.55, 0)
        this.scene.add(this.planeTop)
    }

    mouseIn() {
        TweenLite.to(this.uniforms.u_h, this.time / 2, {
            value: -2.0
        })

    }


    mouseOut() {

        TweenLite.to(this.uniforms.u_h, this.time / 2, {
            value: 0,
        })
    }


    onClick() {
        TweenLite.to(this.uniforms.u_alpha, this.time / 2, {
            value: 2.
        })
    }

    onBack() {
        TweenLite.to(this.uniforms.u_alpha, this.time / 2, {
            value: -1.
        })
    }

    update(delta) {
        if (this.planeCenter)
            this.uniforms.u_delta.value += 1
    }

    bind() {
        this.update = this.update.bind(this)
        this.createBillboard = this.createBillboard.bind(this)
        this.mouseIn = this.mouseIn.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onBack = this.onBack.bind(this)
        this.updateUv = this.updateUv.bind(this)
    }




}