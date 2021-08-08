// data goes from 0-31
// heap goes from 32-63

const input = process.argv[process.argv.length - 1]

const bf = ``

const tokens = input.split(` `)

// Figure out how to find two factors m and n of a number x such that m - n is
// as low as possible.
//
// function factorize(n) {
//   const factors = []
//   let m = 2
//   while (m <= Math.sqrt(n)) {
//     if (Number.isInteger(n / m)) {
//       factors.push(m)
//     } else {
//       m++
//     }
//   }
// }

function inc(n) {
  return Array(n).fill(`+`).join(``)
}

function dec(n) {
  return Array(n).fill(`-`).join(``)
}

let dataPtr = 0
let heapPtr = 32

for (let i = 0; i < tokens.length; i++) {
  const token = tokens[i]
  switch (token) {
  }
}

function moveToHeap() {
  const dist = heapPtr - dataPtr
  return `${inc(dist)}[+${dec(dist)}-]`
}

function moveFromHeap() {
  const dist = heapPtr - dataPtr
  return `${dec(dist)}[+${inc(dist)}-]`
}

function parse(tokens, i) {
  switch (tokens[i]) {
    // Copy current value to tokens[i + 1]
    case `copy`: {
      if (/^\+[0-9]+$/.test(tokens[i + 1])) {
        const dist = heapPtr - dataPtr
        return `${inc(dist)}[-${dec(dist)}]`
      } else if (/^\-[0-9]+$/.test(tokens[i + 1])) {
        return ``
      }
    }
    case `getdigit`: {
      return `,${dec(48)}`
    }
    case `printdigit`: {
      return `${inc(48)}.${dec(48)}`
    }

    // Adds last two cells together and places result in current cell:
    // 3 2 >0< => 3 2 >5<
    case `add`: {
      const res = `<<`
      res += moveToHeap()

      heapPtr++
      res += `>`
      dataPtr++
      res += moveToHeap()

      res += inc(heapPtr - dataPtr)

      res += `<`
      heapPtr--
      res += `[>>+<<-]>[>+<-]`
    }
    case `>`: {
      bf += `>`
      dataPtr++
      break
    }
    case `<`: {
      bf += `<`
      dataPtr--
      if (dataPtr < 0) throw new Error(`Cannot point to cell -1.`)
      break
    }
  }
}

console.log(bf)
