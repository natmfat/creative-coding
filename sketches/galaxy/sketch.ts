import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { title } from "shared/utils/document";

import { Node } from "./Node";
import { NODE_COUNT, RADIUS } from "./config";

// http://www.complexification.net/gallery/machines/happyPlace/

// A. Move close to friends but no closer than some minimum distance.
// B. Distance self from non-friends as reasonably as possible.

title("Galaxy");

new p5((sketch: p5) => {
  const nodes: Node[] = [];
  const palette = createPalette();

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";

    const origin = new p5.Vector(sketch.width / 2, sketch.height / 2);

    // create nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = sketch.random(0, sketch.TWO_PI);
      nodes.push(
        new Node(
          new p5.Vector(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS).add(
            origin,
          ),
          sketch.color(sketch.random(palette)),
        ),
      );
    }

    // create random connections
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes[i].addConnection(sketch.random(nodes));
    }

    sketch.background(255);
    for (let i = 0; i < 100 * 50; i++) {
      for (const node of nodes) {
        node.update(sketch);
        node.draw(sketch);
      }
    }

    sketch.noLoop();
  };
});
