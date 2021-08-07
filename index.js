const stdin = process.stdin
stdin.setRawMode(true)
stdin.setEncoding(`ascii`)
console.info(`pid ${process.pid}`)

const programs = [
  // Hello world
  `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`,

  // Infinitely print stdin
  `+[,.]`,
]
const program = programs[0]

let isRunning = false

let dataPtr = 0
let instrPtr = 0
let mem = Array(30000).fill(0)

let input = []
function getData(chunk) {
  if (chunk === `\u0003`) process.exit()
  input.push(chunk)
  if (!isRunning) run()
}
stdin.on(`data`, getData)

let output = []

function run() {
  try {
    isRunning = true
    while (true) {
      let instr = program[instrPtr]
      if (instr === undefined) exit()

      switch (instr) {
        case `>`: {
          dataPtr++
          break
        }
        case `<`: {
          dataPtr--
          break
        }
        case `+`: {
          mem[dataPtr]++
          break
        }
        case `-`: {
          mem[dataPtr]--
          break
        }
        case `.`: {
          output.push(mem[dataPtr])
          break
        }
        case `,`: {
          if (input.length === 0) {
            return
          } else {
            mem[dataPtr] = input.shift()
          }
        }
        case `[`: {
          if (mem[dataPtr] === 0) {
            let depth = 0
            while (true) {
              instrPtr++
              instr = program[instrPtr]
              if (instr === undefined) {
                console.error(`Missing "]".`)
                exit()
              }
              if (instr === `]` && depth === 0) break
              if (instr === `[`) depth++
              if (instr === `]`) depth--
            }
          }
          break
        }
        case `]`: {
          if (mem[dataPtr] !== 0) {
            let depth = 0
            while (true) {
              instrPtr--
              instr = program[instrPtr]
              if (instr === `[` && depth === 0) break
              if (instr === `]`) depth++
              if (instr === `[`) depth--
            }
          }
          break
        }
      }

      instrPtr++
    }
  } finally {
    isRunning = false
  }
}

run()

function exit() {
  if (output[0] !== undefined) {
    let str = output.reduce((acc, cur) => acc + String.fromCharCode(cur), ``)
    console.info(str)
  }
  process.exit()
}
