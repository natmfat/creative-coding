import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createGrid } from "shared/utils/grid";
import { CELL_SIZE, GRID_MARGIN, GRID_SIZE } from "./config";

new p5((sketch: p5) => {
  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";
    sketch.noLoop();

    const [border, ...palette] = (() => {
      const basePalette = sketch.shuffle(createPalette());
      const length = Math.floor(sketch.random(2, basePalette.length));

      return basePalette.slice(0, length);
    })();

    const grid = sketch.shuffle(
      createGrid(GRID_SIZE)
        .filter(() => sketch.random() > 0.5)
        .map((pos) => ({
          pos,
          radius: Math.abs(sketch.randomGaussian()),
        }))
    );

    // render grid
    sketch.background(255);
    grid.forEach(({ pos, radius }) => {
      sketch.fill(sketch.random(palette));
      sketch.stroke(border);
      sketch.circle(
        sketch.lerp(GRID_MARGIN, sketch.width - GRID_MARGIN, pos[0]),
        sketch.lerp(GRID_MARGIN, sketch.height - GRID_MARGIN, pos[1]),
        1 + CELL_SIZE * Math.pow(radius, 2)
      );
    });
  };
});
