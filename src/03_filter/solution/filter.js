export default function filter(array, filterFunction) {
    return array.reduce((acc, current, index, array) => {
        if (filterFunction(current, index, array)) {
            return [...acc, current];
        }

        return acc;
    }, []);
}
