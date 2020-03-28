import once from './once';

describe('once function', () => {
    test('should return a function', () => {
        expect(typeof once()).toBe('function');
    });

    test('returned function can be executed multiple times, but the supplied callback should be executed once', () => {
        let acc = 0;
        const onlyAccumulateOnce = once((num1, num2) => (acc += num1 + num2));

        onlyAccumulateOnce(2, 3);
        onlyAccumulateOnce(2, 3);
        onlyAccumulateOnce(6, 7);

        expect(acc).toEqual(5);
    });

    test('returned function should return the result of the first execution', () => {
        const onlyAddOnce = once((num1, num2) => num1 + num2);

        expect(onlyAddOnce(2, 3)).toEqual(5);
        expect(onlyAddOnce(2, 3)).toEqual(5);
        expect(onlyAddOnce(6, 7)).toEqual(5);
    });
});
