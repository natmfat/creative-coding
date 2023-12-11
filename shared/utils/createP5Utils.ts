import p5 from "p5";

export function createP5Utils(sketch: p5) {
  function frame(weight: number) {
    const doubleWeight = weight * 2;
    const offset = 0.5;

    sketch.noFill();
    sketch.stroke(0);
    sketch.strokeWeight(weight);
    sketch.rect(
      weight - offset,
      weight - offset,
      sketch.width - doubleWeight + offset,
      sketch.height - doubleWeight + offset
    );
  }

  return { frame };
}
