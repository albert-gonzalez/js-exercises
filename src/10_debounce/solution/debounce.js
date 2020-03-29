export default function debounce(fn, wait = 0) {
    let lastTimeoutId;

    const cancel = () => {
        clearTimeout(lastTimeoutId);
        lastTimeoutId = undefined;
    };

    function debouncedFunction(...args) {
        if (lastTimeoutId) {
            cancel();
        }

        lastTimeoutId = setTimeout(() => {
            fn(...args);
            lastTimeoutId = undefined;
        }, wait);
    }

    debouncedFunction.cancel = cancel;

    return debouncedFunction;
}
