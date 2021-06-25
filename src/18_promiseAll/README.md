# Promise All Function

it takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

[More Info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

-   [Exercise](./promiseAll.js)
-   [Tests](./promiseAll.spec.js)
-   [Solution](./solution/promiseAll.js)

## Test your solution

Run `npm test promiseAll`
