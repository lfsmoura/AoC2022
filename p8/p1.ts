import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const grid: number[][] = [];
let i = 0;
rl.on("line", (input) => {
  grid[i++] = input.split("").map(Number);
});
rl.on("close", () => {
  const counted = new Map<string, boolean>();
  const visibleHeightY = grid.map((_) => -1);
  const visibleHeightX = grid[0].map((_) => -1);
  let visibleCount = 0;
  // run from top to bottom and left to right
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        (grid[i][j] > visibleHeightY[i] || grid[i][j] > visibleHeightX[j]) &&
        !counted.has(`${i},${j}`)
      ) {
        visibleCount++;
        counted.set(`${i},${j}`, true);
      }
      visibleHeightY[i] = Math.max(visibleHeightY[i], grid[i][j]);
      visibleHeightX[j] = Math.max(visibleHeightX[j], grid[i][j]);
    }
  }
  const visibleHeightY2 = grid.map((_) => -1);
  const visibleHeightX2 = grid[0].map((_) => -1);

  // run from bottom to top and right to left
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[i].length - 1; j >= 0; j--) {
      if (
        (grid[i][j] > visibleHeightY2[i] || grid[i][j] > visibleHeightX2[j]) &&
        !counted.has(`${i},${j}`)
      ) {
        visibleCount++;
        counted.set(`${i},${j}`, true);
      }
      visibleHeightY2[i] = Math.max(visibleHeightY2[i], grid[i][j]);
      visibleHeightX2[j] = Math.max(visibleHeightX2[j], grid[i][j]);
    }
  }
  console.log("answer", visibleCount);
});
