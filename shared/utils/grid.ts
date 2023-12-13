export function createGrid(count: number) {
  const grid: number[][] = [];

  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      grid.push([
        count <= 1 ? 0.5 : x / (count - 1),
        count <= 1 ? 0.5 : y / (count - 1),
      ]);
    }
  }

  return grid;
}
