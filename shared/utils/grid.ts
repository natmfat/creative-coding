export function createGrid(size: number) {
  const grid: number[][] = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid.push([i, j]);
    }
  }

  return grid;
}
