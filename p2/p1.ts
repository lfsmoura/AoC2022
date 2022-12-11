import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

/*
A for Rock, B for Paper, and C for Scissors.
X for Rock, Y for Paper, and Z for Scissors
*/
enum Shape {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C',
}
const shapeMap: any = {
    A: Shape.Rock,
    B: Shape.Paper,
    C: Shape.Scissors,
    X: Shape.Rock,
    Y: Shape.Paper,
    Z: Shape.Scissors,
}
// shapeMAp but as a Map
const shapeMap2 = new Map<string, Shape>()
shapeMap2.set('A', Shape.Rock)
shapeMap2.set('B', Shape.Paper)
shapeMap2.set('C', Shape.Scissors)
shapeMap2.set('X', Shape.Rock)
shapeMap2.set('Y', Shape.Paper)
shapeMap2.set('Z', Shape.Scissors)

//(1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
const pointsMap = {
    [Shape.Rock]: 1,
    [Shape.Paper]: 2,
    [Shape.Scissors]: 3,
}

function getPoints(a: Shape, b: Shape) {
    if (a === b) {
        return 3
    }
    if (a === Shape.Rock && b === Shape.Scissors) {
        return 0
    }
    if (a === Shape.Paper && b === Shape.Rock) {
        return 0
    }
    if (a === Shape.Scissors && b === Shape.Paper) {
        return 0
    }
    return 6
}

let sum = 0
// read input line by line
rl.on('line', (input) => {
    const [opponent,guide] = input.split(' ')
    sum += getPoints(shapeMap2.get(opponent)!, shapeMap2.get(guide)!) + pointsMap[shapeMap2.get(guide)!]!
})

rl.on('close', () => {
    console.log('answer', sum)
})