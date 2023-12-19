import p5 from "p5";
import { CHARACTERS, GRID_MARGIN, NOISE_SCALE } from "./config";

export class Character {
  private uv: number[];
  private pos: p5.Vector;
  private color: string;
  private character: string;

  constructor(color: string, character: string, pos: number[]) {
    this.pos = new p5.Vector(pos[0], pos[1]);
    this.color = color;
    this.character = character;
    this.uv = pos;
  }

  scale(sketch: p5, coord: number) {
    return sketch.lerp(GRID_MARGIN, sketch.width - GRID_MARGIN, coord);
  }

  draw(sketch: p5, timer: number) {
    const noise = Math.pow(
      sketch.noise(this.uv[0] * NOISE_SCALE + timer, this.uv[1] * NOISE_SCALE) +
        0.5,
      4,
    );

    if (noise < 0.2) {
      this.character = sketch.random(CHARACTERS);
    }

    sketch.push();

    sketch.translate(
      this.scale(sketch, this.pos.x),
      this.scale(sketch, this.pos.y),
    );
    sketch.scale(noise);

    sketch.textAlign(sketch.CENTER);
    sketch.fill(this.color);
    sketch.noStroke();
    sketch.text(this.character, 0, 0);

    sketch.pop();
  }
}
