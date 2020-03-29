import debounce from './debounce';

jest.useFakeTimers();

describe('debounce function', () => {
    test('should return a function', () => {
        expect(typeof debounce()).toBe('function');
    });

    test(
        'the debounced function should delay invoking the callback until after the supplied time (in ms) have elapsed since' +
            ' the last time the debounced function was invoked. The callback is invoked with the last arguments provided to the debounced function',
        () => {
            let counter = 0;
            const debouncedCounter = debounce(
                incrementValue => (counter += incrementValue),
                500
            );

            debouncedCounter(2);
            expect(counter).toEqual(0);

            jest.advanceTimersByTime(200);
            expect(counter).toEqual(0);

            // when 200 + 300 = 500 ms has elapsed, the callback is executed
            jest.advanceTimersByTime(300);
            expect(counter).toEqual(2);

            debouncedCounter(2);
            expect(counter).toEqual(2);

            jest.advanceTimersByTime(200);

            // when executed again, the wait time is reset
            debouncedCounter(3);
            expect(counter).toEqual(2);

            jest.advanceTimersByTime(400);
            expect(counter).toEqual(2);

            // when 100 + 400 = 500 ms has elapsed, the callback is executed
            jest.advanceTimersByTime(100);
            expect(counter).toEqual(5);
        }
    );

    test('the debounced function has a cancel function which cancels the current delayed execution', () => {
        let counter = 0;
        const debouncedCounter = debounce(
            incrementValue => (counter += incrementValue),
            500
        );

        debouncedCounter(2);
        debouncedCounter.cancel();
        debouncedCounter.cancel();

        jest.advanceTimersByTime(500);
        expect(counter).toEqual(0);
    });
});
