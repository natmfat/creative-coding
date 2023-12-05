import colors from "nice-color-palettes/100.json";

export { colors };

export function createPalette() {
  return colors[Math.floor(Math.random() * colors.length)];
}
