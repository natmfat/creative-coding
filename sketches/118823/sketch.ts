import p5 from "p5";
new p5((sketch: p5) => {
  const scale = 1 / sketch.random(20, 40);

  sketch.setup = () => {
    const canvas = sketch.createCanvas(500, 500);
    canvas.elt.className = "canvas--center outline";
    sketch.noLoop();
  };

  sketch.draw = () => {
    for (let x = 0; x < sketch.width; x++) {
      for (let y = 0; y < sketch.height; y++) {
        const random = sketch.noise(x * scale, y * scale);
        sketch.set(x, y, random * 255);
      }
    }

    sketch.updatePixels();
  };
});
