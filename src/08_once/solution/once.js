export default function once(cb) {
    let called = false;
    let result;

    return (...args) => {
        if (called) {
            return result;
        }

        result = cb(...args);
        called = true;

        return result;
    };
}
