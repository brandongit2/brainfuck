const stdin = process.stdin
stdin.setRawMode(true)
stdin.setEncoding(`ascii`)
console.info(`pid ${process.pid}`)

const programs = [
  // Hello world
  `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`,

  // Infinitely print stdin
  `+[,.]`,

  // `+++++++++++++++++++++++++++++++++.>++++++++++.>++++++++++.`,

  // // Take two numbers from stdin, add them together, print result
  // `
  //   2x8 bytes for the two input numbers
  //   ++++++++++++++++

  //   +[,]
  // `,
]

const arg = process.argv[process.argv.length - 1]
let program
if (/^[0-9]+$/.test(arg)) {
  program = programs[+arg]
} else {
  program = arg
}

let isRunning = false

let dataPtr = 0
let instrPtr = 0
let mem = new Uint8Array(30000).fill(0)

let input = []
function getData(chunk) {
  if (chunk === `\u0003`) exit()
  input.push(chunk.charCodeAt(0))
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
          if (dataPtr === 30000) dataPtr = 0
          break
        }
        case `<`: {
          dataPtr--
          if (dataPtr === -1) dataPtr = 29999
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
          process.stdout.write(String.fromCharCode(mem[dataPtr]))
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
                process.exit(1)
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
              if (instr === undefined) {
                console.error(`Missing "[".`)
                exit(1)
              }
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

function exit(code) {
  const memStr = Array.from(mem)
    .reduce((acc, cur) => `${acc} ${cur}`)
    .replace(/( 0)+$/, ``)
  console.info(`\nExiting. Memory: ${memStr}`)

  process.exit(code)
}
