import { createPalette } from "shared/utils/color";
import { title } from "shared/utils/document";
import p3 from "shared/utils/p3";
import * as THREE from "three";

title("Structures");

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const palette = createPalette().map(
  (color) => new THREE.MeshStandardMaterial({ color })
);

function createCube(color: THREE.MeshStandardMaterial) {
  const cube = new THREE.Mesh(cubeGeometry, color);

  cube.scale.set(Math.random(), Math.random(), Math.random());
  cube.scale.multiplyScalar(0.5);
  cube.position.set(
    THREE.MathUtils.randFloat(-1, 1),
    THREE.MathUtils.randFloat(-1, 1),
    THREE.MathUtils.randFloat(-1, 1)
  );

  return cube;
}

new p3((sketch) => {
  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.className = "canvas--center outline";

    sketch.background("white");
    sketch.ortho(2);

    for (let i = 0; i < 40; i++) {
      const color = palette[THREE.MathUtils.randInt(0, palette.length - 1)];
      sketch.scene.add(createCube(color));
    }

    sketch.scene.add(new THREE.AmbientLight("hsl(0, 0%, 40%)"));

    const light = new THREE.DirectionalLight("white", 2);
    light.position.set(0, 0, 4);
    sketch.scene.add(light);

    sketch.noLoop();
  };

  // let targetMouseX = 0;
  // let mouseX = 0;
  // addEventListener("mousemove", (e) => {
  //   targetMouseX = e.clientX - sketch.width / 2;
  // });

  // sketch.update = () => {
  //   const delta = sketch.clock.getDelta();
  //   mouseX = THREE.MathUtils.lerp(mouseX, targetMouseX, delta);

  //   sketch.scene.rotation.y = mouseX * 0.001;
  // };
});
