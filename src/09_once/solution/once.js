export default function once(fn) {
    let called = false;
    let result;

    return (...args) => {
        if (called) {
            return result;
        }

        result = fn(...args);
        called = true;

        return result;
    };
}
