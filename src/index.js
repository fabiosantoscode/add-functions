'use strict'

module.exports = function addFunctions (...fns) {
  return (...args) => {
    return execute(fns, args)
  }
}

function execute (fns, args) {
  let result = () => null

  fns.forEach((fn, i) => {
    const prevResult = result
    result = () => fn(...args, prevResult)
  })

  return result()
}
