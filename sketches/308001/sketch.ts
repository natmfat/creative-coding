import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createP5Utils } from "shared/utils/createP5Utils";
import { title } from "shared/utils/document";
import { createGrid } from "shared/utils/grid";

const GRID_SIZE = 17;
const GRID_MARGIN = 40;
const HALF_GRID_SIZE = Math.floor(GRID_SIZE / 2);
const CELL_SIZE = 27;

type Cell = { show: boolean; uv: number[]; color: string };

title("Propagating Peaks");

function propagate(x: number, y: number, grid: Cell[], color: string) {
  const i = x + y * GRID_SIZE;
  if (
    // this line is not totally accurate
    // it enables V shaped mountains upon reaching an edge
    !(i >= 0 && i < grid.length) ||
    (grid[i]?.show === true && grid[i].color !== color)
  ) {
    return;
  }

  Object.assign(grid[i], {
    show: true,
    color,
  });

  propagate(x - 1, y + 1, grid, color);
  propagate(x, y + 1, grid, color);
  propagate(x + 1, y + 1, grid, color);
}

new p5((sketch: p5) => {
  const palette = createPalette();
  const grid: Cell[] = createGrid(GRID_SIZE).map((uv) => ({
    show: false,
    uv,
    color: "black",
  }));

  for (let i = 0; i < palette.length; i++) {
    propagate(
      Math.floor(sketch.random(GRID_SIZE)),
      HALF_GRID_SIZE + Math.floor(sketch.random(-4, 4)),
      grid,
      palette[i],
    );
  }

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";
    sketch.noLoop();
  };

  sketch.draw = () => {
    sketch.background(255);

    for (const { uv, show, color } of grid) {
      if (!show) {
        continue;
      }

      const x = sketch.lerp(GRID_MARGIN, sketch.width - GRID_MARGIN, uv[0]);
      const y = sketch.lerp(GRID_MARGIN, sketch.height - GRID_MARGIN, uv[1]);

      sketch.noStroke();
      sketch.fill(color);
      sketch.rectMode(sketch.CENTER);
      sketch.rect(x, y, CELL_SIZE);
    }

    sketch.image(createP5Utils(sketch).createNoiseOverlay(), 0, 0);
    sketch.blendMode(sketch.BLEND);
  };
});
