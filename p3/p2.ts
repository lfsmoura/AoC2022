import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

/*
Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
*/
function getPrioirty(s: string) {
    const charCode = s.charCodeAt(0)
    if (charCode >= 97 && charCode <= 122) {
            return charCode - 96
    }
    if (charCode >= 65 && charCode <= 90) {
            return charCode - 64 + 26
    }
    throw 'Invalid char'
}

let lines = 0
let sum = 0
const groups: string[][] = []
// read input line by line
rl.on('line', (input) => {
    groups[Math.floor(lines/3)] = groups[Math.floor(lines/3)] || []
    groups[Math.floor(lines/3)].push(input)
    lines++
})

function charRepetead(a: string, b: string, c: string) {
    const aMap = new Map<string, number>()
    for (let i = 0; i < a.length; i++) {
        const char = a[i]
        if (aMap.has(char)) {
            aMap.set(char, aMap.get(char)! + 1)
        } else {
            aMap.set(char, 1)
        }
    }
    const bMap = new Map<string, number>()
    for (let i = 0; i < b.length; i++) {
        const char = b[i]
        if (aMap.has(char)) {
            bMap.set(char, 1)
        }
    }
    for (let i = 0; i < c.length; i++) {
        const char = c[i]
        if (bMap.has(char)) {
            return char
        }
    }
    throw new Error('No repeated char')
}

rl.on('close', () => {
    for (let group of groups) {
        const repeated = charRepetead(group[0], group[1], group[2])
        sum += getPrioirty(repeated)
    }
    console.log('answer', sum)
})