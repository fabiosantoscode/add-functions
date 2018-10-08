'use strict'

module.exports = function addFunctions (a, ...rest) {
  let func = (...args) => a(...args)
  rest.forEach(
    fn => {
      const prevFunc = func
      func = (...args) => fn(...args, prevFunc)
    }
  )
  return func
}
