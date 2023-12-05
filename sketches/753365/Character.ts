import p5 from "p5";
import { GRID_MARGIN } from "./config";

export class Character {
  private __sketch: p5;

  private pos: p5.Vector;
  private color: string;
  private character: string;
  private noise: number;

  constructor(__sketch: p5, color: string, character: string, pos: number[]) {
    this.__sketch = __sketch;
    this.pos = new p5.Vector(pos[0], pos[1]);
    this.color = color;
    this.character = character;
    this.noise = __sketch.noise(this.pos.x * 10, this.pos.y * 10);
  }

  scale(coord: number) {
    return this.__sketch.lerp(
      GRID_MARGIN,
      this.__sketch.width - GRID_MARGIN,
      coord
    );
  }

  draw(sketch: p5) {
    sketch.push();

    sketch.translate(this.scale(this.pos.x), this.scale(this.pos.y));
    sketch.rotate(sketch.map(this.noise, 0, 1, 0, sketch.TWO_PI));
    sketch.scale(this.noise * 4 + 1);

    sketch.textAlign(sketch.CENTER);
    sketch.fill(this.color);
    sketch.noStroke();
    sketch.text(this.character, 0, 0);

    sketch.pop();
  }
}
