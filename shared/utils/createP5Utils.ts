import p5 from "p5";

export type P5UtilsConfig = {
  gridSizeX: number;
  gridSizeY: number;
  gridMargin: number;
};

export function createP5Utils(
  sketch: p5,
  { gridSizeX = 0, gridSizeY = 0, gridMargin = 40 }: Partial<P5UtilsConfig> = {}
) {
  /**
   * Add an outline built-in to the canvas instead of a CSS outline
   * @param weight Width of the outline
   */
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

  function scaleX(x: number) {
    return sketch.lerp(gridMargin, gridSizeX - gridMargin, x);
  }

  function scaleY(x: number) {
    return sketch.lerp(gridMargin, gridSizeY - gridMargin, x);
  }

  return { frame, scaleX, scaleY };
}
