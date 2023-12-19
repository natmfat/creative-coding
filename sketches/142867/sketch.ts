import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { createGrid } from "shared/utils/grid";
import { CHARACTERS, GRID_SIZE } from "./config";
import { Character } from "./Character";
import { title } from "shared/utils/document";

title("Data Lake");

new p5((sketch: p5) => {
  const [bg, ...colors] = sketch.shuffle(createPalette());
  const grid = createGrid(GRID_SIZE).map(
    (pos) => new Character(sketch.random(colors), CHARACTERS[0], pos),
  );

  let timer = 0;

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";
  };

  sketch.draw = () => {
    timer += 0.01;
    sketch.background(bg);

    grid.forEach((circle) => {
      circle.draw(sketch, timer);
    });
  };
});
