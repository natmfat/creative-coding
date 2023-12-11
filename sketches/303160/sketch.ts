import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { Rectangle } from "./Rectangle";
import { title } from "shared/utils/document";
import { createP5Utils } from "shared/utils/createP5Utils";

title("Piet Mondrian");

new p5((sketch: p5) => {
  const rectangles: Rectangle[] = [];
  const palette = createPalette();

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center";
    sketch.noLoop();

    rectangles.push(
      new Rectangle(0, 0, sketch.width, sketch.height, rectangles, true)
    );

    for (const rectangle of rectangles.reverse()) {
      rectangle.draw(sketch, palette);
    }

    createP5Utils(sketch).frame(2);
  };
});
