import promiseRace from './promiseRace';

jest.useFakeTimers();

describe('promiseAll function', () => {
    test('it should return a forever pending promise if no argument is provided', async () => {
        const spy = jest.fn();

        promiseRace()
            .then(spy)
            .catch(spy);

        jest.advanceTimersByTime(1000);

        expect(spy).not.toHaveBeenCalled();
    });

    test('it should return a forever pending promise provided iterable is empty', async () => {
        const spy = jest.fn();

        promiseRace()
            .then(spy)
            .catch(spy);

        jest.advanceTimersByTime(1000);

        expect(spy).not.toHaveBeenCalled();
    });

    test('it should return a promise that fulfills when the first of the promises passed as an iterable has been fulfilled', done => {
        const promise3Seconds = new Promise(resolve =>
            setTimeout(() => resolve(1), 3000)
        );

        const promise2Seconds = new Promise(resolve =>
            setTimeout(() => resolve(2), 2000)
        );

        promiseRace([promise3Seconds, promise2Seconds]).then(value => {
            expect(value).toEqual(2);
            done();
        });

        jest.advanceTimersByTime(3000);
    });

    test('it should return a promise that fulfills when the first of the promises passed as an iterable has been fulfilled, even if some of the values in the iterable are not promises', done => {
        const promise1Second = new Promise(resolve =>
            setTimeout(() => resolve(1), 1000)
        );

        const someValue = 35;

        promiseRace([promise1Second, someValue]).then(values => {
            expect(values).toEqual(35);
            done();
        });

        jest.advanceTimersByTime(2000);
    });

    test('it should return a promise that fullfills if the iterable contains one or more non-promise value and/or an already settled promise and resolve to the first of these values', done => {
        const promise1Second = new Promise(resolve =>
            setTimeout(() => resolve(1), 1000)
        );

        const someValue = 35;

        promiseRace([promise1Second, someValue, Promise.resolve(2)]).then(
            values => {
                expect(values).toEqual(35);
                done();
            }
        );

        promiseRace([promise1Second, Promise.resolve(2), someValue]).then(
            values => {
                expect(values).toEqual(2);
                done();
            }
        );

        jest.advanceTimersByTime(2000);
    });

    test('it should return a promise that rejects with the reason of the first promise that rejects', done => {
        const promise1Second = new Promise((resolve, reject) =>
            setTimeout(() => reject('First promise rejected'), 1000)
        );

        const promise2Seconds = new Promise((resolve, reject) =>
            setTimeout(() => reject('Second promise rejected'), 2000)
        );

        promiseRace([promise2Seconds, promise1Second]).catch(error => {
            expect(error).toEqual('First promise rejected');
            done();
        });

        jest.advanceTimersByTime(2000);
    });

    test('it should work passing other types of iterables', async () => {
        const promise1 = Promise.resolve(1);

        const promise2 = Promise.resolve(2);

        expect(await promiseRace(new Set([promise2, promise1]))).toEqual(2);

        expect(
            await promiseRace(
                new Map([
                    ['a', promise2],
                    ['b', promise1],
                ])
            )
        ).toEqual(2);
    });
});
