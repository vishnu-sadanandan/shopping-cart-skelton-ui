function printGridLayout(gridSize, gridElements) {
  const grid = createEmptyGrid(gridSize);

  for (const element of gridElements) {
    for (let i = element.row; i < element.row + element.height; i++) {
      for (let j = element.column; j < element.column + element.width; j++) {
        grid[i][j] = 'X';
      }
    }
  }

  for (const row of grid) {
    console.log(row.join(' '));
  }
}

function createEmptyGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill('.'));
}

// Example usage with your grid elements
let gridElements = [
  { row: 0, column: 0, width: 3, height: 5 },
  { row: 2, column: 3, width: 5, height: 4 },
  // Add more elements as needed
];

printGridLayout(10, gridElements);