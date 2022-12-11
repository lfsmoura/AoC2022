import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

let moves: number[][] = []
let invertedStacks: string[][] = []

rl.on('line', (input) => {
    if (input.indexOf('[') !== -1) {
        let i = 0
        for (const match of input.matchAll(/((...$))|((... ))/g)) {
            const s = match[0].replace(/[\[\]]/g, '').trim()
            if (s) {
                invertedStacks[i] = invertedStacks[i] || []
                invertedStacks[i].push(s)
            }
            i++
        }
    } else if (input.indexOf('move') !== -1) {
        moves.push(input.split(' ').map((n) => parseInt(n)).filter((n) => !isNaN(n)))
    }
})

rl.on('close', () => {
    const stacks = invertedStacks.map((s) => s.reverse())
    for (const move of moves) {
        const [times, from, to] = move
        const newStack: string[] = []
        for (let i = 0; i < times; i++) {
            const block = stacks[from-1].pop()
            newStack.push(block!)
        }
        stacks[to-1] = stacks[to-1].concat(newStack.reverse())
    }
    console.log('answer', stacks.map(s => s[s.length-1]).join(''))
})