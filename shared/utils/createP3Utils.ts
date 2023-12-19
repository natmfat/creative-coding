import p3, { THREE } from "./p3";

export type P3Utils = ReturnType<typeof createP3Utils>;

export function createP3Utils(sketch: p3) {
  /**
   * Sizes in THREE.js will take on pixel coordinates
   * @link https://github.com/mrdoob/three.js/issues/1239
   * @param distance
   */
  function usePixelCoordinates(distance = 500) {
    const fov = (2 * Math.atan(sketch.height / (2 * distance)) * 180) / Math.PI;

    sketch.perspective(fov, 0.01, distance * 2);
    sketch.camera.position.z = distance;
    sketch.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  return {
    usePixelCoordinates,
  };
}
