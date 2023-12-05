import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createGrid } from "shared/utils/grid";
import { GRID_SIZE } from "./config";
import { Circle } from "./Circle";

new p5((sketch: p5) => {
  const [clrBackground, clrCircle] = sketch.shuffle(createPalette());
  const grid = createGrid(GRID_SIZE).map(
    (pos) => new Circle(sketch, clrCircle, pos)
  );

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";
    sketch.noLoop();
  };

  sketch.draw = () => {
    sketch.background(clrBackground);
    grid.forEach((circle) => {
      circle.draw(sketch);
    });
  };
});
