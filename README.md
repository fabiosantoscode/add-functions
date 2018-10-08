# add-functions
Add two functions together and choose when the original one gets called!

# require('add-functions')(a, (callOriginal) => { callOriginal(); foo()})
Add two functions. You can add more than 2 functions together, just pass more arguments to the function. Functions after the first one will take a callOriginal argument after the arguments passed to the result function. This function will be equal to the function before yours.

```javascript

const a = n => n + 1
const b = (n, callPrevious) => n + callPrevious(n) + 1

const c = addFunctions(a, b)

c(0)  // -> 2
```
