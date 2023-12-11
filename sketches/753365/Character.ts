import p5 from "p5";
import { GRID_MARGIN, NOISE_SCALE } from "./config";

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
    this.noise = Math.pow(
      __sketch.noise(pos[0] * NOISE_SCALE, pos[1] * NOISE_SCALE) + 0.7,
      4
    );
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
    sketch.rotate(this.noise);
    sketch.scale(this.noise);

    sketch.textAlign(sketch.CENTER);
    sketch.fill(this.color);
    sketch.noStroke();
    sketch.text(this.character, 0, 0);

    sketch.pop();
  }
}
