import p5 from "p5";
import { createP5Utils } from "shared/utils/createP5Utils";
import { title } from "shared/utils/document";

const RINGS_COUNT = 40;
const MARGIN = 40;

title("Concentric Waves");

new p5((sketch: p5) => {
  let timer = 0;

  let noise: p5.Graphics;

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";

    noise = createP5Utils(sketch).createNoiseOverlay();
  };

  sketch.draw = () => {
    sketch.background(255);

    timer += 0.01;

    for (let i = 0; i < RINGS_COUNT; i++) {
      const progress = i / (RINGS_COUNT - 1);
      const size = sketch.lerp(MARGIN, sketch.width - MARGIN, progress);

      sketch.push();
      sketch.translate(sketch.width / 2, sketch.height / 2);

      sketch.strokeWeight(2);
      sketch.noFill();
      sketch.arc(
        0,
        0,
        size,
        size,
        0,
        sketch.map(sketch.noise(progress + timer), 0, 1, 0, sketch.TWO_PI),
      );

      sketch.pop();
    }

    sketch.image(noise, 0, 0);
    sketch.blendMode(sketch.BLEND);
  };
});
