import p5 from "p5";
import { createPalette } from "shared/utils/color";

new p5((sketch: p5) => {
  const scale = 1 / sketch.random(20, 40);
  const palette = createPalette().map((color) => sketch.color(color));

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";
    sketch.noLoop();
  };

  sketch.draw = () => {
    for (let x = 0; x < sketch.width; x++) {
      for (let y = 0; y < sketch.height; y++) {
        const random = sketch.noise(x * scale, y * scale);
        const color = palette[Math.floor(random * palette.length)];
        sketch.set(x, y, color);
      }
    }

    sketch.updatePixels();
  };
});
