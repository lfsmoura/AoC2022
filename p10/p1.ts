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
  let i = 0;
  while (cycle < 221) {
    let [op, val] = lines[i++ % lines.length].split(" ");
    if (op === "addx") {
      cycle += 2;
      if (cycle >= nextCycle) {
        result += x * nextCycle;
        nextCycle += 40;
      }
      x += parseInt(val);
    } else {
      cycle++;
    }
  }
  console.log("answer", result);
});
