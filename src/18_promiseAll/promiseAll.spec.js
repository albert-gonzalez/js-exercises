import promiseAll from './promiseAll';

jest.useFakeTimers();

describe('promiseAll function', () => {
    test('it should return a resolved promise if no argument is provided', async () => {
        let spy = jest.fn();

        await promiseAll().then(spy);

        expect(spy).toHaveBeenCalled();
    });

    test('it should return a resolved promise if provided iterable is empty', async () => {
        let spy = jest.fn();

        await promiseAll().then(spy);

        expect(spy).toHaveBeenCalled();
    });

    test('it should return a promise that fulfills when all of the promises passed as an iterable have been fulfilled', done => {
        const promise1Second = new Promise(resolve =>
            setTimeout(() => resolve(1), 1000)
        );

        const promise2Seconds = Promise.resolve(2);

        promiseAll([promise1Second, promise2Seconds]).then(values => {
            expect(values).toEqual([1, 2]);
            done();
        });

        jest.advanceTimersByTime(1000);
    });

    test('it should return a promise that fulfills when all of the promises passed as an iterable have been fulfilled, even if some of the values in the iterable are not promises', done => {
        const promise1Second = new Promise(resolve =>
            setTimeout(() => resolve(1), 1000)
        );

        const someValue = 35;

        promiseAll([promise1Second, someValue]).then(values => {
            expect(values).toEqual([1, 35]);
            done();
        });

        jest.advanceTimersByTime(2000);
    });

    test('it should return a promise that rejects with the reason of the first promise that rejects', done => {
        const promise1Second = new Promise((resolve, reject) =>
            setTimeout(() => reject('First promise rejected'), 1000)
        );

        const someValue = new Promise((resolve, reject) =>
            setTimeout(() => reject('Second promise rejected'), 2000)
        );

        promiseAll([promise1Second, someValue]).catch(error => {
            expect(error).toEqual('First promise rejected');
            done();
        });

        jest.advanceTimersByTime(2000);
    });

    test('it should work passing other types of iterables', async () => {
        const promise1 = Promise.resolve(1);

        const promise2 = Promise.resolve(2);

        expect(await promiseAll(new Set([promise2, promise1]))).toEqual([2, 1]);

        expect(
            await promiseAll(
                new Map([
                    ['a', promise2],
                    ['b', promise1],
                ])
            )
        ).toEqual([2, 1]);
    });
});
