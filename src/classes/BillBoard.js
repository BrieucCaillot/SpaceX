import * as THREE from 'three';

// import vertSource from '../shaders/plane.vert';
// import fragSource from '../shaders/plane.frag';

import PlaneVertex from '../shaders/PlaneVertex';
import PlaneFragment from '../shaders/PlaneFragment';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const gridFbx = require('../assets/grid.fbx');

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
        this.loadGrid()
    }


    loadGrid() {
        this.fbxLoader.load(gridFbx, (obj) => {
            console.log('obj', obj)
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
            }
        }
        console.log(this.plane)
        let s = 0.5
        this.plane.scale.set(s, s, s)
        this.plane.translateY(0.3)
        this.plane.rotateX(Math.PI / 2)
        this.plane.rotateZ(Math.PI)
        this.plane.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: PlaneVertex,
            fragmentShader: PlaneFragment,
        })
        // this.plane.material = new THREE.MeshNormalMaterial()
        this.scene.add(this.plane)

    }

    update(delta) {
        if (this.plane)
            this.uniforms.u_delta.value += 1
    }

    bind() {
        this.update = this.update.bind(this)
        this.createBillboard = this.createBillboard.bind(this)
    }




}
