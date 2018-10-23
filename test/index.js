'use strict'

var assert = require('assert')
if (assert.strict) assert = assert.strict

var addFunctions = require('..')

describe('add-functions', function () {
  it('adds two functions', function () {
    var foo = []
    addFunctions(function (original) {
      foo.push(original + 1)
    }, function (original, callOriginal) {
      foo.push(original)
      callOriginal()
      foo.push(original + 2)
    })(1)

    assert.deepEqual(foo, [1, 2, 3])
  })

  it('adds three functions', function () {
    var foo = []

    addFunctions(
      function (original) { foo.push(original + 1) },
      function (original, callOriginal) { foo.push(original); callOriginal(); foo.push(original + 2) },
      function (original, callOriginal) { callOriginal(); foo.push(original + 3) }
    )(0)

    assert.deepEqual(foo, [0, 1, 2, 3])
  })

  it('propagates return values', function () {
    var add1 = function (n) { return n + 1 }
    var add1Prev = function (n, prev) { return n + prev(n) + 1 }

    assert.equal(addFunctions(add1, add1Prev, add1Prev)(0), 3)
  })

  it('you can call the previous function on the first function, but it does nothing', function () {
    addFunctions(function (callPrevious) {
      assert.equal(callPrevious(), null)
    })()
  })
})
