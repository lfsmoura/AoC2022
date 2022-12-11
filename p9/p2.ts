import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const dToMove = (a: string) => {
  switch (a) {
    case "U":
      return [0, 1];
    case "D":
      return [0, -1];
    case "L":
      return [-1, 0];
    case "R":
      return [1, 0];
  }
  throw new Error("invalid direction");
};

let moves: number[][] = [];

let i = 0;
rl.on("line", (input) => {
  const [d, n] = input.split(" ");
  moves = moves.concat(new Array(parseInt(n)).fill(1).map((_) => dToMove(d)));
});
rl.on("close", () => {
  let tail = new Array(10).fill(1).map((_) => ({ x: 0, y: 0 }));

  let visited = new Set<string>();
  visited.add("0,0");

  const areNeighbors = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
  };

  const getDerivative = (x1: number, x2: number) => {
    let diff = x2 - x1;
    if (diff === 0) {
      return 0;
    }
    if (diff > 0) {
      return -1;
    }
    return 1;
  };

  for (let move of moves) {
    tail[0].x += move[0];
    tail[0].y += move[1];

    for (let i = 1; i < tail.length; i++) {
      let { x, y } = tail[i - 1];
      let { x: tailX, y: tailY } = tail[i];
      if (!areNeighbors(x, y, tailX, tailY)) {
        tail[i].x += getDerivative(x, tailX);
        tail[i].y += getDerivative(y, tailY);
      }
    }

    visited.add(`${tail[9].x},${tail[9].y}`);
  }
  console.log("answer", visited.size);
});
