import fibonnaciGenerator from './fibonacciGenerator';

describe('fibonacci generator function', () => {
    test('should be a generator', () => {
        expect(fibonnaciGenerator.constructor.name).toBe('GeneratorFunction');
    });

    test('should generate fibonacci sequence in each next call', () => {
        let numArray = [];
        for (let num of fibonnaciGenerator()) {
            if (num > 13) {
                break;
            }

            numArray.push(num);
        }

        expect(numArray).toEqual([1, 2, 3, 5, 8, 13]);
    });

    test('should not share state between generators', () => {
        const fibonacci = fibonnaciGenerator();
        const otherFibonacci = fibonnaciGenerator();

        expect(fibonacci.next().value).toEqual(1);
        expect(fibonacci.next().value).toEqual(2);
        expect(fibonacci.next().value).toEqual(3);

        expect(otherFibonacci.next().value).toEqual(1);
        expect(otherFibonacci.next().value).toEqual(2);
        expect(otherFibonacci.next().value).toEqual(3);
    });

    test('it should reset the sequence if a truthy value is provided to next function', () => {
        const fibonacci = fibonnaciGenerator();

        expect(fibonacci.next().value).toEqual(1);
        expect(fibonacci.next().value).toEqual(2);
        expect(fibonacci.next().value).toEqual(3);
        expect(fibonacci.next(true).value).toEqual(1);
        expect(fibonacci.next().value).toEqual(2);
        expect(fibonacci.next().value).toEqual(3);
    });
});
