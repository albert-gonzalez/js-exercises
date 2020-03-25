export default function flatten(arr) {
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return acc.concat(flatten(item));
        }

        return acc.concat(item);
    }, []);
}
