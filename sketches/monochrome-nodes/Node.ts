import p5 from "p5";
import { MIN_DISTANCE } from "./config";

export class Node {
  private vel = new p5.Vector();
  private connections: Node[] = [];

  constructor(public pos: p5.Vector) {}

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
        continue;
      }

      this.vel.add(node.pos.copy().sub(this.pos).mult(0.01));
    }

    this.pos.add(this.vel);
    this.vel.mult(0.9);
  }

  draw(sketch: p5) {
    sketch.stroke(0, 20);
    for (const node of this.connections) {
      sketch.line(this.pos.x, this.pos.y, node.pos.x, node.pos.y);
    }
  }
}
