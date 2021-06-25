# Merge Generator

It creates a generator which merges the provided generators. The generator returns the result of the provided mergeFn (which receives the values returned by every provided generator as argument) every time is invoked. The generator will be completed when one of the merged generators is completed.

[More Info about generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

-   [Exercise](./mergeGenerator.js)
-   [Tests](./mergeGenerator.spec.js)
-   [Solution](./solution/mergeGenerator.js)

## Test your solution

Run `npm test mergeGenerator`
