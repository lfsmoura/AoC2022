import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

// 1-2,4-8 -> [[1,2],[4,8]]
const parseRange = (range: string): Number[][] => {
    const ranges = range.split(',')
    return ranges.map((r) => {
        const [start, end] = r.split('-')
        return [parseInt(start), parseInt(end)]
    })
}
const contained = (a: Number[], b: Number[]) => {
    return a[0] >= b[0] && a[1] <= b[1] || a[0] <= b[0] && a[1] >= b[1]
}

let fullyContain = 0
rl.on('line', (input) => {
    const ranges = parseRange(input)
    fullyContain += contained(ranges[0], ranges[1]) ? 1 : 0
})

rl.on('close', () => {
    console.log('answer', fullyContain)
})