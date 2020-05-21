import reduce from './reduce';

describe('reduce function', () => {
    test('should accept three parameters: an array, a reducer callback and the initial value of the accumulator', () => {
        expect(typeof reduce).toEqual('function');
        reduce([1, 2, 3], (acc, current) => acc + current, 0);
    });

    test('reducer callback should receive four parameters: the accumulator, the current value, the current index and the array', () => {
        let accSpy;
        let currentSpy;
        let indexSpy;
        let arraySpy;
        reduce(
            [1],
            (acc, current, index, array) => {
                accSpy = acc;
                currentSpy = current;
                indexSpy = index;
                arraySpy = array;

                return acc + current;
            },
            0
        );

        expect(accSpy).toEqual(0);
        expect(currentSpy).toEqual(1);
        expect(indexSpy).toEqual(0);
        expect(arraySpy).toEqual([1]);
    });

    test('If no initialValue is passed, the first element in the array will be used as inital value and skipped in the reduce', () => {
        let accSpy;
        let currentSpy;

        reduce([1, 2], (acc, current) => {
            accSpy = acc;
            currentSpy = current;

            return acc + current;
        });

        expect(accSpy).toEqual(1);
        expect(currentSpy).toEqual(2);
    });

    test("the accumulator should accumulate callback's return values for each value in the array. The reduce function will return this accumulator when all the values in the array have benn processed", () => {
        // Sum
        expect(reduce([5, 3, 2], (acc, current) => acc + current, 1)).toEqual(
            11
        );

        // Num counter
        expect(
            reduce(
                [1, 5, 2, 1, 5],
                (acc, current) => {
                    acc[current] =
                        acc[current] !== undefined ? acc[current] + 1 : 1;

                    return acc;
                },
                {}
            )
        ).toEqual({
            1: 2,
            5: 2,
            2: 1,
        });

        // Multiply without inital value
        expect(reduce([2, 3, 4, 5], (acc, current) => acc * current)).toEqual(
            120
        );
    });
});
