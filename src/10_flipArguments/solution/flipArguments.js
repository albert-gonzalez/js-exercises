export default function flipArguments(fn) {
    return (...args) => fn(...args.reverse());
}
