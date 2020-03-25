import memoize from '../04_memoize/memoize';

const module = {
    factorial: memoize(function(n) {
        if (n === 1) {
            return n;
        }

        return n * module.factorial(n - 1); // This module call is to allow jest to spy on factorial function
    }),
};

export default module;
