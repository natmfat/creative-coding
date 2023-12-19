import p5 from "p5";
import { createPalette } from "shared/utils/color";
import { NODE_COUNT, RADIUS } from "./config";
import { Node } from "./Node";
import { title } from "shared/utils/document";
import { createP5Utils } from "shared/utils/createP5Utils";

// http://www.complexification.net/gallery/machines/happyPlace/

// A. Move close to friends but no closer than some minimum distance.
// B. Distance self from non-friends as reasonably as possible.

title("Nodes");

new p5((sketch: p5) => {
  const nodes: Node[] = [];
  const palette = createPalette();

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";

    const origin = new p5.Vector(sketch.width / 2, sketch.height / 2);

    // create nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = sketch.map(i, 0, NODE_COUNT - 1, 0, sketch.TWO_PI);
      nodes.push(
        new Node(
          new p5.Vector(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS).add(
            origin,
          ),
          sketch.random(palette),
        ),
      );
    }

    // create random connections
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes[i].addConnection(sketch.random(nodes));
    }

    sketch.background(255);
  };

  sketch.draw = () => {
    for (const node of nodes) {
      node.update(sketch);
      node.draw(sketch);
    }

    if (sketch.frameCount > 250) {
      sketch.noLoop();

      const utils = createP5Utils(sketch);

      sketch.image(utils.createNoiseOverlay(), 0, 0);
      sketch.blendMode(sketch.BLEND);
    }
  };
});
