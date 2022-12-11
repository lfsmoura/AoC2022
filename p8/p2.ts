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
  let maxScenicScore = 0;

  // 4 8 4 *4*
  function rayCount(
    startY: number,
    startX: number,
    dirX: number,
    dirY: number
  ) {
    let count = 0;
    let x = startX + dirX;
    let y = startY + dirY;
    let max = grid[startY][startX];
    while (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
      count++;
      if (grid[y][x] >= max) {
        return count;
      }
      x += dirX;
      y += dirY;
    }
    return count;
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const score = [
        rayCount(i, j, 1, 0),
        rayCount(i, j, 0, 1),
        rayCount(i, j, -1, 0),
        rayCount(i, j, 0, -1),
      ].reduce((acc, el) => acc * el);
      if (score > maxScenicScore) {
        maxScenicScore = score;
      }
    }
  }

  console.log("answer", maxScenicScore);
});
