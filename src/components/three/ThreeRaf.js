import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const ThreeRaf = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { renderer, scene, camera, rocketSections } = ThreeState;

  const mousePos = new THREE.Vector2();

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove)
    animate()
  }, [])

  const animate = () => {
    requestAnimationFrame(animate);
    update()
  };

  const update = () => {
    renderer.render(scene, camera)
    camera.lookAt(0, 0, 0)
    camera.position.x += (mousePos.x / 5 - camera.position.x) * 0.05
    camera.position.y += (-mousePos.y / 5 - camera.position.y) * 0.05

    if (rocketSections.children.length == 4) {
      for (const rocketSection of rocketSections.children) {
        rocketSection.update()
      }
    }
  }

  const mouseMove = (e) => {
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = - (e.clientY / window.innerHeight) * 2 + 1;
  }

  return null

}

export default ThreeRaf;
