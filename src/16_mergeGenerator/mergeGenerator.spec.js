import mergeGenerator from './mergeGenerator';

function* autoincrement(initValue = 1, quantity = 3) {
    for (let i = 0; i < quantity; i++) {
        yield initValue;

        initValue++;
    }
}

describe('mergeGenerator function', () => {
    test('should be a generator', () => {
        expect(mergeGenerator.constructor.name).toBe('GeneratorFunction');
    });

    test(
        'should accept N arguments. The first argument is the merge function. The rest of the arguments are generators.' +
            'The provided function will receive as parameters the yielded values of the provided generators. The result of the callback will be yielded',
        () => {
            const merge = mergeGenerator(
                (...values) => values,
                autoincrement(),
                autoincrement(2),
                autoincrement(3)
            );

            expect(Array.from(merge)).toEqual([
                [1, 2, 3],
                [2, 3, 4],
                [3, 4, 5],
            ]);
        }
    );

    test('should stop yielding values when one of the provided generators is done', () => {
        const merge = mergeGenerator(
            (...values) => values.join(' '),
            autoincrement(),
            autoincrement(2),
            autoincrement(3, 2)
        );

        expect(Array.from(merge)).toEqual(['1 2 3', '2 3 4']);
    });
});
