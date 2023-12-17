import { createP3Utils } from "shared/utils/createP3Utils";
import { title } from "shared/utils/document";
import p3, { THREE } from "shared/utils/p3";
import fragmentShader from "./shader.frag";
import vertexShader from "./shader.vert";

const SKETCH_SIZE = 500;

title("Lava Lamp");

new p3((sketch) => {
  const uniforms = {
    u_time: { value: 1.0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_resolution: { value: new THREE.Vector2(SKETCH_SIZE, SKETCH_SIZE) },
  };

  sketch.setup = () => {
    const canvas = sketch.createCanvas(SKETCH_SIZE, SKETCH_SIZE);
    canvas.className = "canvas--center outline";

    sketch.background("white");

    createP3Utils(sketch).usePixelCoordinates();

    sketch.scene.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
        })
      )
    );
  };

  sketch.update = () => {
    uniforms.u_time.value = sketch.clock.getElapsedTime();
    uniforms.u_mouse.value.x = sketch.mouseX / sketch.width;
    uniforms.u_mouse.value.y = sketch.mouseY / sketch.height;
  };
});
