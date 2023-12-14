/**
 * @file Basic math utilities for sketches that don't require the entirety of p5 or three
 * @author Nathan <natmfat@gmail.com>
 */

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
