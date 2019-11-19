import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const gridTexture = require('../../assets/gridTexture.png')

const Grid = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const {scene} = ThreeState;

  const size = 20;
  const tile = 1;
  const textureLoader = new THREE.TextureLoader()
  const grid = new THREE.Group()

  useEffect(() => {

    if (scene) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), new THREE.MeshBasicMaterial({
        transparent: true,
        map: textureLoader.load(gridTexture),
      }))

      for (let x = -size / 2; x < size / 2; x += tile) {
        for (let y = 0; y < size; y += tile) {
          let plClone = plane.clone()
          plClone.position.set(x, y, 0)
          grid.add(plClone)
        }
      }

      grid.position.z = 5;
      grid.position.y = -0.8;
      grid.rotateX(-Math.PI / 2)

      scene.add(grid)
    }

  }, [scene])

  return null

}

export default Grid;
