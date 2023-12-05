export function createGrid(count: number) {
  const grid: number[][] = [];

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      grid.push([
        count <= 1 ? 0.5 : x / (count - 1),
        count <= 1 ? 0.5 : y / (count - 1),
      ]);
    }
  }

  return grid;
}
