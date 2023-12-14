import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { title } from "shared/utils/document";

const GRID_MARGIN = 40;
const GRID_SIZE = 6;
const TRAPEZOID_COUNT = 10;

title("Trapezoids");

function scale(sketch: p5, x: number, y: number) {
  return [
    sketch.lerp(GRID_MARGIN, sketch.width - GRID_MARGIN, x),
    sketch.lerp(GRID_MARGIN, sketch.height - GRID_MARGIN, y),
  ];
}

function randomPoint() {
  return Math.floor(Math.random() * GRID_SIZE) / (GRID_SIZE - 1);
}

function createTrapezoid() {
  const leftX = randomPoint();
  const leftY = randomPoint();

  const rightX = randomPoint();
  const rightY = randomPoint();

  return [
    [leftX, leftY],
    [rightX, rightY],
    [rightX, 1],
    [leftX, 1],
  ];
}

new p5((sketch: p5) => {
  const [bg, ...palette] = createPalette();
  const trapezoids = new Array(TRAPEZOID_COUNT)
    .fill(0)
    .map(() => createTrapezoid())
    .sort((a, b) => {
      const averageA = (a[0][1] + a[1][1]) / 2;
      const averageB = (b[0][1] + b[1][1]) / 2;

      return Math.sign(averageA - averageB);
    })
    .filter((t) => t[0][0] !== t[1][0]);

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";
    sketch.noLoop();
  };

  sketch.draw = () => {
    sketch.background(bg);

    for (let i = 0; i < trapezoids.length; i++) {
      const trapezoid = trapezoids[i];

      sketch.stroke(bg);
      sketch.strokeWeight(10);
      sketch.fill(palette[i % palette.length]);
      sketch.beginShape();

      for (const point of trapezoid) {
        const scaledPoint = scale(sketch, point[0], point[1]);
        sketch.vertex(scaledPoint[0], scaledPoint[1]);
      }

      sketch.endShape(sketch.CLOSE);
    }
  };
});
