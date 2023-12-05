import p5 from "p5";
import { GRID_MARGIN, GRID_SIZE, CELL_SIZE } from "./config";

export class Circle {
  private __sketch: p5;

  private pos: p5.Vector;
  private color: string;

  private size: number;
  private hidden: boolean;

  constructor(__sketch: p5, color: string, pos: number[]) {
    this.__sketch = __sketch;
    this.pos = new p5.Vector(pos[0], pos[1]);
    this.color = color;

    this.size = __sketch.noise(this.pos.x, this.pos.y);
    this.hidden = this.size > 0.5;
  }

  get scalePos() {
    return new p5.Vector(this.scale(this.pos.x), this.scale(this.pos.y));
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

    sketch.circle(this.scalePos.x, this.scalePos.y, this.size * CELL_SIZE);
    sketch.fill(this.color);
    sketch.noStroke();
  }
}
