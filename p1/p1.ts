import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

let max = 0
let current = 0

// read input line by line
rl.on('line', (input) => {
    if (input.trim() === '') {
        current = 0;
        return;
    }
    const cal = parseInt(input)
    current += cal
    if (current > max) {
        max = current
    }
})

rl.on('close', () => {
    console.log('Max is', max)
})