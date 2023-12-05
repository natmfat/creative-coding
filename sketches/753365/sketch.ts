import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createGrid } from "shared/utils/grid";
import { GRID_SIZE } from "./config";
import { Character } from "./Character";

new p5((sketch: p5) => {
  const [bg, ...colors] = sketch.shuffle(createPalette());
  const grid = createGrid(GRID_SIZE).map(
    (pos) =>
      new Character(
        sketch,
        sketch.random(colors),
        sketch.random(["-", "▴"]),
        pos
      )
  );

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";
  };

  sketch.draw = () => {
    sketch.background(bg);
    grid.forEach((circle) => {
      circle.draw(sketch);
    });
  };
});
