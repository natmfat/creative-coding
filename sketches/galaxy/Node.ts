import p5 from "p5";

import { MIN_DISTANCE } from "./config";

export class Node {
  public pos: p5.Vector;

  private vel = new p5.Vector();
  private connections: Node[] = [];
  private color: p5.Color;

  constructor(pos: p5.Vector, color: p5.Color) {
    this.pos = pos;
    this.color = color;
    this.color.setAlpha(2);
  }

  addConnection(node: Node) {
    this.connections.push(node);
  }

  update(sketch: p5) {
    for (const node of this.connections) {
      if (
        !(
          node !== this &&
          sketch.dist(this.pos.x, this.pos.y, node.pos.x, node.pos.y) >
            MIN_DISTANCE
        )
      ) {
        this.vel.add(node.pos.copy().sub(this.pos).mult(-0.001));
      }

      this.vel.add(node.pos.copy().sub(this.pos).mult(0.001));
    }

    this.pos.add(this.vel);
    this.vel.mult(0.9);
  }

  draw(sketch: p5) {
    sketch.stroke(this.color);
    for (const node of this.connections) {
      sketch.line(this.pos.x, this.pos.y, node.pos.x, node.pos.y);
    }
  }
}
