import memoize from './memoize';

describe('memoize function', () => {
    test('should return a function', () => {
        expect(typeof memoize(() => 'result')).toEqual('function');
    });

    test('should accept function as a param which does not need params. The memoized function will store the result for an input and only execute the original function once', () => {
        const fn = jest.fn(() => 'result');

        const memoizedFn = memoize(fn);

        memoizedFn();
        memoizedFn();
        expect(memoizedFn()).toEqual('result');

        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('should accept a function as a param function which needs 1 param. The memoized function will store the result for an input and only execute the original function once', () => {
        const fn = jest.fn(n => n);

        const memoizedFn = memoize(fn);

        expect(memoizedFn(2)).toEqual(2);
        expect(memoizedFn('a')).toEqual('a');
        expect(memoizedFn(2)).toEqual(2);

        expect(fn).toHaveBeenCalledTimes(2);
    });

    test('should accept a function as a param which needs 2 or more params. The memoized function will store the result for an input and only execute the original function once', () => {
        const fn = jest.fn((n, m) => n + m);

        const memoizedFn = memoize(fn);

        expect(memoizedFn(2, 3)).toEqual(5);
        expect(memoizedFn('a', 3)).toEqual('a3');
        expect(memoizedFn(2, 3)).toEqual(5);
        expect(memoizedFn(3, 2)).toEqual(5);

        expect(fn).toHaveBeenCalledTimes(3);
    });

    test('should accept a callback function which accepts arrays or objects as params. The memoized function will store the result for an input and only execute the original function once', () => {
        const fn = jest.fn((someObject, someArray) => [
            Object.keys(someObject),
            someArray.length,
        ]);

        const memoizedFn = memoize(fn);

        expect(memoizedFn({ a: 1 }, [1, 2, 3])).toEqual([['a'], 3]);
        expect(memoizedFn({ b: 2, c: 3 }, [1])).toEqual([['b', 'c'], 1]);
        expect(memoizedFn({ a: 1 }, [1, 2, 3])).toEqual([['a'], 3]);

        expect(fn).toHaveBeenCalledTimes(2);
    });
});
