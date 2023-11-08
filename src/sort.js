// Sample data structure to represent elements
const elements = [
  { row: 0, column: 0, width: 2, height: 2 },
  { row: 0, column: 2, width: 3, height: 1 },
  { row: 2, column: 0, width: 2, height: 3 },
  // Add more elements as needed
];

// Function to delete an item by index
function deleteItem(index) {
  if (index >= 0 && index < elements.length) {
    elements.splice(index, 1);
    reorganizeLayout();
  }
}

// Function to reorganize the layout after deleting an item
function reorganizeLayout() {
  // Sort elements by row and column values
  elements.sort((a, b) => {
    if (a.row !== b.row) return a.row - b.row;
    return a.column - b.column;
  });

  // Create a 2D grid to track the occupied cells
  const grid = new Array(8).fill().map(() => new Array(8).fill(false));

  // Iterate through the sorted elements and update their positions
  for (const element of elements) {
    let newRow, newColumn;
    // Find the first available cell for the element
    for (newRow = 0; newRow < 8 - element.height + 1; newRow++) {
      for (newColumn = 0; newColumn < 8 - element.width + 1; newColumn++) {
        let isCellOccupied = false;
        for (let r = newRow; r < newRow + element.height; r++) {
          for (let c = newColumn; c < newColumn + element.width; c++) {
            if (grid[r][c]) {
              isCellOccupied = true;
              break;
            }
          }
          if (isCellOccupied) break;
        }
        if (!isCellOccupied) {
          // Update the element's position
          element.row = newRow;
          element.column = newColumn;
          // Mark the cells as occupied
          for (let r = newRow; r < newRow + element.height; r++) {
            for (let c = newColumn; c < newColumn + element.width; c++) {
              grid[r][c] = true;
            }
          }
          break;
        }
      }
      if (newRow < 8 - element.height + 1) break;
    }
  }

  // Update the UI or perform any other necessary actions
  updateUI();
}

// Function to update the UI (for demonstration purposes, you can replace this with actual UI updates)
function updateUI() {
  console.log("Updated layout:");
  elements.forEach((element, index) => {
    console.log(`Element ${index}: row=${element.row}, column=${element.column}`);
  });
}

// Example: Delete the element at index 1
deleteItem(1);