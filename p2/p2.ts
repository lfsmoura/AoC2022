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
// shapeMAp but as a Map
const shapeMap2 = new Map<string, Shape>()
shapeMap2.set('A', Shape.Rock)
shapeMap2.set('B', Shape.Paper)
shapeMap2.set('C', Shape.Scissors)

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
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
function getShapeToPlay(opponent: Shape, guide: string) {
    if (guide === 'Z') {
        if (opponent === Shape.Rock) {
            return Shape.Paper
        }
        if (opponent === Shape.Paper) {
            return Shape.Scissors
        }
        if (opponent === Shape.Scissors) {
            return Shape.Rock
        }
    }
    if (guide === 'X') {
        if (opponent === Shape.Rock) {
            return Shape.Scissors
        }
        if (opponent === Shape.Paper) {
            return Shape.Rock
        }
        if (opponent === Shape.Scissors) {
            return Shape.Paper
        }
    }
    if (guide === 'Y') {
        if (opponent === Shape.Rock) {
            return Shape.Rock
        }
        if (opponent === Shape.Paper) {
            return Shape.Paper
        }
        if (opponent === Shape.Scissors) {
            return Shape.Scissors
        }
    }
    throw new Error('Invalid guide')
}

let sum = 0
// read input line by line
rl.on('line', (input) => {
    const [opponent,guide] = input.split(' ')
    const shapeToPlay = getShapeToPlay(shapeMap2.get(opponent)!, guide)
    sum += getPoints(shapeMap2.get(opponent)!, shapeToPlay) + pointsMap[shapeToPlay]!
})

rl.on('close', () => {
    console.log('answer', sum)
})