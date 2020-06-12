import memoize from '../06_memoize/memoize';

const module = {
    factorial: memoize(n => {
        if (n === 1) {
            return n;
        }

        return n * module.factorial(n - 1); // This module call is to allow jest to spy on factorial function
    }),
};

export default module;
