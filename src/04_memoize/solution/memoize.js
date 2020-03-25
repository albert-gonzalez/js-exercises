export default function memoize(cb) {
    const cache = {};

    return (...args) => {
        const key = JSON.stringify(args);

        if (key in cache) {
            return cache[key];
        }

        const result = cb(...args);
        cache[key] = result;

        return result;
    };
}
