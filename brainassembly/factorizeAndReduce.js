function factorize(x) {
  if (x < 10) return x

  let fac = Math.floor(Math.sqrt(x))
  while (!Number.isInteger(x / fac)) fac--

  let fac1 = fac
  let fac2 = x / fac

  if (fac1 !== 1) {
    if (fac1 >= 10) {
      fac1 = factorizeAndReduce(fac1)
    }
    if (fac2 >= 10) {
      fac2 = factorizeAndReduce(fac2)
    }
  }

  return [fac1, fac2]
}

function reducePrime(prime) {
  let diff = 1
  let facs
  while ((facs = factorize(prime + diff)).includes(1)) {
    if (diff < 0) {
      diff = -diff + 1
      if (diff === 0) diff++
    } else if (diff > 0) {
      diff = -diff - 1
      if (diff === 0) diff--
    }
  }

  return [`+`, facs, -Math.sign(diff) * factorize(diff)]
}

function factorizeAndReduce(x) {
  const facs = factorize(x)
  if (facs[0] === 1 || facs[0] === -1) {
    return reducePrime(facs[1])
  } else if (facs[1] === 1 || facs[1] === -1) {
    return reducePrime(facs[0])
  }

  return facs
}

function pluses(n) {
  return Array(n).fill(`+`).join(``)
}

function minuses(n) {
  return Array(n).fill(`-`).join(``)
}

function bfIfy(n) {
  if (Array.isArray(n)) {
    if (n[0] === `+`) {
      return `${bfIfy(n[1])}+${bfIfy(n[2])}`
    } else {
      return `${pluses()}[]`
    }
  } else {
    return n
  }
}

module.exports = {bfIfy, factorizeAndReduce}
