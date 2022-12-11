import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

let max = 0
let current = 0
let calories: number[] = []

// read input line by line
rl.on('line', (input) => {
    if (input.trim() === '') {
        calories.push(current)
        current = 0;
        return;
    }
    const cal = parseInt(input)
    current += cal
})

rl.on('close', () => {
    calories.push(current)
    console.log('Max is', calories.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b))
})