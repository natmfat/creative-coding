import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createGrid } from "shared/utils/grid";
import { GRID_MARGIN, GRID_SIZE, CELL_SIZE, SCALE } from "./config";

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

    const grid = createGrid(GRID_SIZE)
      .filter(() => sketch.random() > 0.5)
      .map((pos) => ({
        pos,
        radius: CELL_SIZE * sketch.noise(pos[0] * SCALE, pos[1] * SCALE),
      }));

    // render grid
    sketch.background(255);
    grid.forEach(({ pos, radius }) => {
      const x = sketch.lerp(GRID_MARGIN, sketch.width - GRID_MARGIN, pos[0]);
      const y = sketch.lerp(GRID_MARGIN, sketch.height - GRID_MARGIN, pos[1]);

      sketch.fill(sketch.random(palette));
      sketch.stroke(border);
      sketch.circle(x, y, radius);
    });
  };
});
