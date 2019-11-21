import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const ThreeRaf = () => {

  const ThreeState = useSelector(state => state.ThreeReducer)
  const { renderer, scene, camera, rocketSections } = ThreeState;

  const mousePos = new THREE.Vector2();
  const raycaster = new THREE.Raycaster()

  useEffect(() => {
    console.log('raf')
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



  const raycast = () => {
    // this.rayFlag = false
    if (scene.children.length != undefined) {
      for (let j = 0; j < scene.children[3].children.length; j++) {
        raycaster.setFromCamera(mousePos, camera);
        var intersects = raycaster.intersectObjects(scene.children[3].children[j].children);
        for (var i = 0; i < intersects.length; i++) {
          if (intersects[i].object.name == 'placeCenter') {
            // this.rayFlag = true
          }
        }
      }
    }
  }


  const mouseMove = (e) => {
    raycast()
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = - (e.clientY / window.innerHeight) * 2 + 1;
  }

  return null

}

export default ThreeRaf;
