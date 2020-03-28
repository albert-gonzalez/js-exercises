export default function debounce(cb, wait = 0) {
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
            cb(...args);
            lastTimeoutId = undefined;
        }, wait);
    }

    debouncedFunction.cancel = cancel;

    return debouncedFunction;
}
