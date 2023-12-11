import p5 from "p5";
import { createGrid } from "shared/utils/grid";

const RESOLUTION = 50;
const SCALE = 10;
const MARGIN = 40;

new p5((sketch: p5) => {
  const grid = sketch.shuffle(createGrid(RESOLUTION));

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";
    sketch.noLoop();
  };

  sketch.draw = () => {
    sketch.background(0);

    for (const point of grid) {
      const x = sketch.lerp(MARGIN, sketch.width - MARGIN, point[0]);
      const y = sketch.lerp(MARGIN, sketch.height - MARGIN, point[1]);
      sketch.noStroke();
      sketch.fill(sketch.noise(point[0] * SCALE, point[1] * SCALE) * 255);
      sketch.circle(x, y, (sketch.width - 2 * MARGIN) / RESOLUTION);
    }

    sketch.updatePixels();
  };
});
