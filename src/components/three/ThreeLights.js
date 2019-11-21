import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const ThreeLight = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { scene } = ThreeState;

  useEffect(() => {
    if (scene) {
      const light = new THREE.AmbientLight()
      light.intensity = 0.4
      const pointLight = new THREE.PointLight()
      pointLight.position.set(10, 10, 10)
      pointLight.intensity = 0.5
      scene.add(pointLight, light)
    }
  }, [scene])

  return null

}

export default ThreeLight;
