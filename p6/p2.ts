import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

rl.on('line', (input) => {
    let w = ''    
    for(let c = 0; c < input.length; c++) {
        if (w.length >= 14) {
            w = w.slice(1)
        }
        w += input[c]
        if (new Set(w.split('')).size === 14) {
            console.log('answer', w, c+1)
            process.exit(0) 
        }
    }
})
rl.on('close', () => {

})