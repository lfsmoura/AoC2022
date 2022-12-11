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

const overlap = (a: Number[], b: Number[]) => {
    const [aStart, aEnd] = a
    const [bStart, bEnd] = b
    return aStart <= bEnd && bStart <= aEnd
}

let fullyContain = 0
rl.on('line', (input) => {
    const ranges = parseRange(input)
    fullyContain += overlap(ranges[0], ranges[1]) ? 1 : 0
})

rl.on('close', () => {
    console.log('answer', fullyContain)
})