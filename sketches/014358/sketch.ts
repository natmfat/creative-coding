import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createGrid } from "shared/utils/grid";
import { GRID_MARGIN, GRID_SIZE } from "./config";
import { Circle } from "./Circle";

new p5((sketch: p5) => {
  const [clrBackground, clrCircle] = sketch.shuffle(createPalette());
  let grid: Circle[] = [];
  let pos: p5.Vector;

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";

    grid = createGrid(GRID_SIZE).map(
      (pos) => new Circle(sketch, clrCircle, pos)
    );

    pos = new p5.Vector(
      sketch.random(GRID_MARGIN, sketch.width - GRID_MARGIN),
      sketch.random(GRID_MARGIN, sketch.height - GRID_MARGIN)
    );

    sketch.noLoop();
  };

  sketch.draw = () => {
    sketch.background(clrBackground);
    for (const circle of grid) {
      circle.draw(pos);
    }
  };
});
