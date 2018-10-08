# add-functions

[![Build Status](https://travis-ci.org/fabiosantoscode/add-functions.svg?branch=master)](https://travis-ci.org/fabiosantoscode/add-functions) [![Coverage Status](https://coveralls.io/repos/github/fabiosantoscode/add-functions/badge.svg)](https://coveralls.io/github/fabiosantoscode/add-functions)

Add two functions together and choose when the original one gets called!

# require('add-functions')(a, (callOriginal) => { callOriginal(); foo()})
Adds one or more functions together. Functions will take an additional callOriginal argument. This function will call the function before yours in the added functions.

```javascript

const a = n => n + 1
const b = (n, callPrevious) => n + callPrevious() + 1

const c = addFunctions(a, b)

c(0)  // -> 2
```

```javascript
const asynchronouslyAdd2 = addFunctions(
    () => getPromise(),
    (previous) => previous().then((p => p + 1)),
    (previous) => previous().then((p => p + 1)),
)
```
