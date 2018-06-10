let convert = (input) => {
  return input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase())
}

let processObject = (input, options) => {
  let obj = {}
  for (let key in input) {
    if (options.deep) {
      obj[camelcase(key, options)] = typeof input[key] === 'object' ? camelcase(input[key], options) : input[key]
    } else {
      obj[camelcase(key, options)] = input[key]
    }
  }
  return obj
}

let processArray = (input, options) => {
  return Object.keys(input).map(key => { return processObject(input[key], options) })
}

let camelcase = (input, options) => {
  if (!input) {
    throw new Error('Invalid input provided.')
  }

  options = Object.assign({
    deep: false
  }, options)

  let output

  switch (typeof input) {
    case 'string':
      output = convert(input)
      break
    case 'object':
      if (Array.isArray(input)) {
        output = processArray(input, options)
      } else {
        output = processObject(input, options)
      }
  }
  return output
}

module.exports.camelcase = camelcase