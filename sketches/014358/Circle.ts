import p5 from "p5";
import { GRID_MARGIN, CELL_SIZE } from "./config";

export class Circle {
  private __sketch: p5;

  private pos: p5.Vector;
  private color: string;

  constructor(__sketch: p5, color: string, pos: number[]) {
    this.__sketch = __sketch;
    this.pos = new p5.Vector(pos[0], pos[1]);
    this.color = color;
  }

  scale(coord: number) {
    return this.__sketch.lerp(
      GRID_MARGIN,
      this.__sketch.width - GRID_MARGIN,
      coord,
    );
  }

  draw(pos: p5.Vector) {
    const sketch = this.__sketch;

    const posX = this.scale(this.pos.x);
    const posY = this.scale(this.pos.y);
    const size =
      1 -
      this.__sketch.dist(pos.x, pos.y, posX, posY) /
        Math.max(this.__sketch.width, this.__sketch.height);

    sketch.push();
    sketch.fill(this.color);
    sketch.noStroke();
    sketch.translate(posX, posY);
    sketch.scale(Math.pow(size, 2));
    sketch.circle(0, 0, CELL_SIZE);
    sketch.pop();
  }
}
