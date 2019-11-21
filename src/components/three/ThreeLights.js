import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const ThreeLight = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene } = ThreeState;

  useEffect(() => {
    if (scene) {
      const light = new THREE.AmbientLight()
      const pointLight = new THREE.PointLight()
      pointLight.position.set(10, 10, 0)
      scene.add(pointLight)
    }
  }, [scene])

  return null

}

export default ThreeLight;
