import wait from './wait';

jest.useFakeTimers();

describe('wait function', () => {
    test('should return a promise which resolves when the supplied amount of time (in ms) has elapsed', done => {
        const spyFn = jest.fn();

        const timeToWait = 1500;

        wait(timeToWait)
            .then(spyFn)
            .then(() => expect(spyFn).toHaveBeenCalled())
            .then(done);

        expect(spyFn).not.toHaveBeenCalled();
        expect(setTimeout).toHaveBeenCalledWith(
            expect.any(Function),
            timeToWait
        );

        jest.runAllTimers();
    });
});
