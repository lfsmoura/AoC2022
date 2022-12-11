import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
let x = 1;
let cycle = 0;
let result = 0;
const lines: string[] = [];
let nextCycle = 20;
rl.on("line", (input) => {
  lines.push(input);
});
rl.on("close", () => {
  //the sprite is 3 pixels wide, and the X register sets the
  // horizontal position of the middle of that sprite.

  // If the sprite is positioned such that one of its three pixels
  // is the pixel currently being drawn, the screen produces a lit pixel (#)

  // so we need to check if the current cycle is equal to X, X-1, and X+1?
  function draw() {
    const position = (cycle - 1) % 40;
    const lit = position === x || position === x - 1 || position === x + 1;
    process.stdout.write(lit ? "#" : " ");
    if (cycle % 40 == 0) {
      console.log();
    }
  }
  let i = 0;
  while (cycle < 240) {
    let [op, val] = lines[i++ % lines.length].split(" ");
    if (op === "addx") {
      cycle++;
      draw();
      cycle++;
      draw();
      x += parseInt(val);
    } else {
      cycle++;
      draw();
    }
  }
});
