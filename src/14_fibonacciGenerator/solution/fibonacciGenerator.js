export default function* fibonacciGenerator() {
    let current;
    let previous;
    let tmp;
    let reset;

    while (true) {
        current = 1;
        previous = 0;
        reset = false;

        while (!reset) {
            tmp = current;
            current = current + previous;
            previous = tmp;

            reset = yield current;
        }
    }
}
