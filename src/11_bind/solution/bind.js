export default function bind(fn, context) {
    return (...args) => {
        return fn.apply(context, args);
    };
}
