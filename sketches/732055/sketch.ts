import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createGrid } from "shared/utils/grid";
import { CELL_SIZE, GRID_MARGIN, GRID_SIZE } from "./config";

new p5((sketch: p5) => {
  const [clrBackground, clrCircle] = sketch.shuffle(createPalette());
  const grid = createGrid(GRID_SIZE).filter(() => Math.random() > 0.5);

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";
    sketch.noLoop();
  };

  sketch.draw = () => {
    sketch.background(clrBackground);
    grid.forEach((circle) => {
      sketch.fill(clrCircle);
      sketch.noStroke();
      sketch.circle(
        sketch.lerp(GRID_MARGIN, sketch.width - GRID_MARGIN, circle[0]),
        sketch.lerp(GRID_MARGIN, sketch.height - GRID_MARGIN, circle[1]),
        CELL_SIZE,
      );
    });
  };
});
