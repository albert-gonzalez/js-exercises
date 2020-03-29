import each from 'jest-each';
import factorialModule from './factorial';

describe('memoized recursive factorial function: (n * (n - 1) * (n - 2) ... * 1)', () => {
    beforeEach(jest.restoreAllMocks);
    each([
        [5, 120, 5],
        [7, 5040, 3],
        [10, 3628800, 4],
        [12, 479001600, 3],
    ]).test(
        'should calculate the factorial of %d and memoize every step of the calculation',
        (n, result, numberOfRecursiveCalls) => {
            jest.spyOn(factorialModule, 'factorial');

            expect(factorialModule.factorial(n)).toEqual(result);
            expect(factorialModule.factorial).toHaveBeenCalledTimes(
                numberOfRecursiveCalls
            );
        }
    );
});
