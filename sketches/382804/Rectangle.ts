import p5 from "p5";
import { MAX_RECTANGLES, THRESHOLD } from "./config";

export class Rectangle {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    rectangles: Rectangle[],
    force: boolean = false
  ) {
    // recursively create another rectangle (by chance)
    if ((Math.random() > 0.3 && rectangles.length < MAX_RECTANGLES) || force) {
      if (Math.random() > 0.5) {
        // use half width
        const half = width / 2;
        if (half > THRESHOLD) {
          rectangles.push(new Rectangle(x + half, y, half, height, rectangles));
          rectangles.push(new Rectangle(x, y, half, height, rectangles));
        }
      } else {
        // use half height
        const half = height / 2;
        if (half > THRESHOLD) {
          rectangles.push(new Rectangle(x, y + half, width, half, rectangles));
          rectangles.push(new Rectangle(x, y, width, half, rectangles));
        }
      }
    }
  }

  draw(sketch: p5, palette: string[]) {
    sketch.fill(sketch.random(palette));
    sketch.strokeWeight(2);
    sketch.stroke(0);
    sketch.rect(
      this.x - 0.5,
      this.y - 0.5,
      this.width + 0.5,
      this.height + 0.5
    );
  }
}
