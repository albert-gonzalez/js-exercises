import curry from './curry';

describe('curry function', () => {
    test('should return a function', () => {
        expect(typeof curry(() => {})).toBe('function');
    });

    test(
        'returned function should accept arguments of the original function and either invokes the original function returning its result' +
            ' if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments, and so on',
        () => {
            const curriedSumArity3 = curry((x, y, z) => x + y + z, 3);

            expect(curriedSumArity3(2)(3)(5)).toEqual(10);

            const curriedSumArity2 = curry((x, y, z) => x + y + z, 2);

            expect(curriedSumArity2(2)(3, 5)).toEqual(10);
        }
    );

    test('If arity is not passed, then is equals to fn.length', () => {
        const curriedError = curry(
            (errorMessage, context) =>
                `${errorMessage}: ${JSON.stringify(context)}`
        );

        const fatalError = curriedError('Fatal Error!');

        expect(
            fatalError({ exception: 'Out of Bounds', sessionId: 1 })
        ).toEqual('Fatal Error!: {"exception":"Out of Bounds","sessionId":1}');

        expect(
            fatalError({
                exception: 'Out of Memory',
                sessionId: 2,
                maxMemory: '128M',
            })
        ).toEqual(
            'Fatal Error!: {"exception":"Out of Memory","sessionId":2,"maxMemory":"128M"}'
        );
    });
});
