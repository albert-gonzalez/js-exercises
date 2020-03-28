export default function reduce(array, reducer, initialValue) {
    let acc = initialValue;

    if (initialValue === undefined) {
        acc = array[0];
        array = array.slice(1);
    }

    array.forEach((element, index) => {
        acc = reducer(acc, element, index, array);
    });

    return acc;
}
