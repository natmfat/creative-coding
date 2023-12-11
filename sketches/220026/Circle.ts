import p5 from "p5";
import { GRID_MARGIN, CELL_SIZE } from "./config";

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

    this.size = __sketch.noise(this.pos.x * 10, this.pos.y * 10);
    this.hidden = this.size > 0.5;
  }

  get scalePos() {
    return new p5.Vector(this.scale(this.pos.x), this.scale(this.pos.y));
  }

  scale(coord: number) {
    return this.__sketch.lerp(
      GRID_MARGIN,
      this.__sketch.width - GRID_MARGIN,
      coord
    );
  }

  draw(sketch: p5) {
    if (this.hidden) {
      return;
    }

    sketch.fill(this.color);
    sketch.noStroke();
    sketch.circle(this.scalePos.x, this.scalePos.y, this.size * CELL_SIZE);
  }
}
