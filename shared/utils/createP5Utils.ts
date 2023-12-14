import p5 from "p5";

export type P5UtilsConfig = {
  gridSizeX: number;
  gridSizeY: number;
  gridMargin: number;
};

export type P5Utils = ReturnType<typeof createP5Utils>;

export function createP5Utils(
  sketch: p5,
  { gridSizeX = 0, gridSizeY = 0, gridMargin = 40 }: Partial<P5UtilsConfig> = {}
) {
  /**
   * Create a textured noise pattern over the sketch \
   * Computationally prohibitive to run every frame, use in setup
   * @link https://openprocessing.org/sketch/2102209
   * @returns Completed noise overlay
   */
  function createNoiseOverlay() {
    const noiseOverlay = sketch.createGraphics(sketch.width, sketch.height);
    noiseOverlay.loadPixels();
    for (let x = 0; x < sketch.width; x++) {
      for (let y = 0; y < sketch.height; y++) {
        const rand = sketch.random() * 255;
        noiseOverlay.set(x, y, [rand, rand, rand, 20]);
      }
    }

    noiseOverlay.updatePixels();
    return noiseOverlay;
  }

  /**
   * Add an outline built-in to the canvas instead of a CSS outline
   * @param weight Width of the outline
   */
  function frame(weight: number) {
    sketch.noFill();
    sketch.stroke(0);
    sketch.strokeWeight(weight);
    sketch.rect(0, 0, sketch.width, sketch.height);
  }

  function scaleX(x: number) {
    return sketch.lerp(gridMargin, gridSizeX - gridMargin, x);
  }

  function scaleY(x: number) {
    return sketch.lerp(gridMargin, gridSizeY - gridMargin, x);
  }

  return { frame, scaleX, scaleY, createNoiseOverlay };
}
