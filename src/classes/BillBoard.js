import * as THREE from 'three'

import PlaneFragment from '../shaders/PlaneFragment'
import PlaneVertex from '../shaders/PlaneVertex'

import { TweenLite } from "gsap";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import grid from '../assets/grid.fbx'

export default class Billboard {
    constructor(scene, textureLoader, url) {
        this.bind()
        this.scene = scene
        this.url = url
        this.textureLoader = textureLoader
        this.fbxLoader = new FBXLoader()
        this.texture = null
        this.plane = null
        this.uniforms = null
        this.time = 0.8;

        this.loadGrid()
    }

    loadGrid() {
        this.fbxLoader.load(grid, (obj) => {
            this.createBillboard(obj.children[0])
        })
    }

    createBillboard(obj) {
        this.plane = obj
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
        }
        let s = 0.5
        this.plane.scale.set(s, s, s)
        this.plane.translateY(0.3)
        this.plane.rotateX(Math.PI / 2)
        this.plane.rotateZ(Math.PI)
        this.plane.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: PlaneVertex,
            fragmentShader: PlaneFragment,
            transparent: true
        })
        console.log(this.plane)
        this.scene.add(this.plane)


    }

    mouseIn() {
        TweenLite.to(this.uniforms.u_h, this.time / 2, {
            value: -4.0
        })
        TweenLite.to(this.uniforms.u_h, this.time / 2, {
            value: 0,
            delay: this.time / 2
        })
    }


    mouseOut() {

        TweenLite.to(this.uniforms.u_h, this.time / 2, {
            value: -4.0
        })
        TweenLite.to(this.uniforms.u_h, this.time / 2, {
            value: 0,
            delay: this.time / 2
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
        if (this.plane)
            this.uniforms.u_delta.value += 1
    }

    bind() {
        this.update = this.update.bind(this)
        this.createBillboard = this.createBillboard.bind(this)
        this.mouseIn = this.mouseIn.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onBack = this.onBack.bind(this)
    }




}