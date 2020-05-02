export default function curry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length < arity) {
            return curried.bind(this, ...args);
        }

        return fn(...args);
    };
}

// Solution without bind
/*
export default function curry(fn, arity = fn.length) {
    return (function nextCurried(...previousArgs) {
        return function curried(...args) {
            if (previousArgs.length + args.length < arity) {
                return nextCurried(...previousArgs, ...args);
            }

            return fn(...previousArgs, ...args);
        };
    })();
}
*/
