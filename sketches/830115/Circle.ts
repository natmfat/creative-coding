import p5 from "p5";
import { GRID_MARGIN, GRID_SIZE, CELL_SIZE } from "./config";

export class Circle {
  private __sketch: p5;

  private pos: p5.Vector;
  private color: string;
  private hidden: boolean;

  constructor(__sketch: p5, color: string, pos: number[]) {
    this.__sketch = __sketch;
    this.pos = new p5.Vector(pos[0], pos[1]);
    this.color = color;
    this.hidden = Math.random() > 0.5;
  }

  scale(coord: number) {
    return this.__sketch.lerp(
      GRID_MARGIN,
      this.__sketch.width - GRID_MARGIN,
      (coord + 0.5) / GRID_SIZE
    );
  }

  draw(sketch: p5) {
    if (this.hidden) {
      return;
    }

    sketch.circle(this.scale(this.pos.x), this.scale(this.pos.y), CELL_SIZE);
    sketch.fill(this.color);
    sketch.noStroke();
  }
}
