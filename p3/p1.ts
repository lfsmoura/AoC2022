import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

let sum = 0
// read input line by line
rl.on('line', (input) => {
    const [a,b] = [input.slice(0, input.length/2), input.slice(input.length/2)]
    function repeatedChar(a: string, b: string): string {
        const aMap = new Map<string, number>()
        for (let i = 0; i < a.length; i++) {
            const char = a[i]
            if (aMap.has(char)) {
                aMap.set(char, aMap.get(char)! + 1)
            } else {
                aMap.set(char, 1)
            }
        }
        for (let i = 0; i < b.length; i++) {
            const char = b[i]
            if (aMap.has(char)) {
                return char
            }
        }
        throw new Error('No repeated char')
    }
    const repeated = repeatedChar(a, b)
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
   sum += getPrioirty(repeated)
})

rl.on('close', () => {
    console.log('answer', sum)
})