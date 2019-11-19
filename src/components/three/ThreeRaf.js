import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const ThreeRaf = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { renderer, scene, camera } = ThreeState;

  const mousePos = new THREE.Vector2();

  useEffect(() => {
    if (renderer && camera) {
      animate()
    }
  }, [ThreeState])

  const animate = () => {
    requestAnimationFrame(animate);
    update()
  };

  const update = () => {
    renderer.render(scene, camera)
    camera.lookAt(0, 0, 0)
    camera.position.x += (mousePos.x / 5 - camera.position.x) * 0.05
    camera.position.y += (-mousePos.y / 5 - camera.position.y) * 0.05
  }

  return null

}

export default ThreeRaf;
