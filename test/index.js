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

  it('propagates return values', () => {
    const add1 = n => n + 1
    const add1Prev = (n, prev) => n + prev(n) + 1

    assert.equal(addFunctions(add1, add1Prev, add1Prev)(0), 3)
  })

  it('you can call the previous function on the first function, but it does nothing', () => {
    addFunctions((callPrevious) => {
      assert.equal(callPrevious(), null)
    })()
  })
})
