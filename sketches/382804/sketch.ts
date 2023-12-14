import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { Rectangle } from "./Rectangle";
import { title } from "shared/utils/document";
import { createP5Utils } from "shared/utils/createP5Utils";
import { createGrid } from "shared/utils/grid";

title("Piet Mondrian Grid");

const GRID_SIZE = 4;
const GRID_MARGIN = 100;

new p5((sketch: p5) => {
  const palette = createPalette();

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";
    sketch.noLoop();

    const CELL_SIZE = (sketch.width - GRID_MARGIN * 2) / GRID_SIZE;
    const HALF_CELL_SIZE = CELL_SIZE / 2;

    createGrid(GRID_SIZE)
      .map((uv) => ({
        uv,
        pos: [
          sketch.lerp(GRID_MARGIN, sketch.width - GRID_MARGIN, uv[0]),
          sketch.lerp(GRID_MARGIN, sketch.height - GRID_MARGIN, uv[1]),
        ],
        rectangles: [] as Rectangle[],
      }))
      .forEach(({ pos, rectangles }) => {
        rectangles.push(
          new Rectangle(
            pos[0] - HALF_CELL_SIZE,
            pos[1] - HALF_CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
            rectangles,
            true
          )
        );

        for (const rectangle of rectangles.reverse()) {
          rectangle.draw(sketch, palette);
        }
      });
  };
});
