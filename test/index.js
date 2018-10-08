'use strict'

const assert = require('assert').strict
const addFunctions = require('..')

describe('add-functions', () => {
  it('adds two functions', () => {
    const foo = []
    addFunctions((original) => {
      foo.push(original + 1)
    }, (original, callOriginal) => {
      foo.push(original)
      callOriginal(original)
      foo.push(original + 2)
    })(1)

    assert.deepEqual(foo, [1, 2, 3])
  })

  it('adds three functions', () => {
    const foo = []

    addFunctions(
      original => { foo.push(original + 1) },
      (original, callOriginal) => { foo.push(original); callOriginal(original); foo.push(original + 2) },
      (original, callOriginal) => { callOriginal(original); foo.push(original + 3) }
    )(0)

    assert.deepEqual(foo, [0, 1, 2, 3])
  })
})
