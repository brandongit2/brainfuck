const util = require(`util`)
const {factorizeAndReduce} = require(`./factorizeAndReduce`)

const input = process.argv[process.argv.length - 1]
let bf = ``
const tokens = input.split(` `)

console.log(util.inspect(factorizeAndReduce(30), {depth: null}))

function inc(n) {
  return Array(n).fill(`+`).join(``)
}

function dec(n) {
  return Array(n).fill(`-`).join(``)
}

for (let i = 0; i < tokens.length; i++) {
  const token = tokens[i]
  bf += parse(token)
}

function parse(token) {
  if (/^[0-9]+$/.test(token))
    return Array(+token)
      .fill(`+`)
      .join(``)

  switch (token) {
    case `getdigit`: {
      return `,${dec(48)}`
    }
    case `printdigit`: {
      return `${inc(48)}.${dec(48)}`
    }

    // Adds last two cells together and places result in current cell:
    // 3 2 >0< => 0 0 >5<
    case `add`: {
      return `<<[>>+<<-]>[>+<-]>`
    }
    case `sub`: {
      return `<<[>>+<<-]>[>-<-]>`
    }
    case `>`: {
      return `>`
    }
    case `<`: {
      return `<`
    }
  }
}

console.log(bf)
