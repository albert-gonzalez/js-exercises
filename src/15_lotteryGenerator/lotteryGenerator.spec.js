import lotteryGenerator from './lotteryGenerator';

describe('lotteryGenerator function', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValue(0.5)
            .mockReturnValueOnce(0.001)
            .mockReturnValueOnce(0.2)
            .mockReturnValueOnce(0.2)
            .mockReturnValueOnce(0.7)
            .mockReturnValueOnce(0.8)
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(0.1);
    });

    afterEach(() => {
        global.Math.random.mockRestore();
    });

    test('should be a generator', () => {
        expect(lotteryGenerator.constructor.name).toBe('GeneratorFunction');
    });

    test('should generate with default parameters 6 random numbers with a max number of 100. The numbers can not be repeated', () => {
        const lottery = lotteryGenerator();

        expect(Array.from(lottery)).toEqual([1, 20, 70, 80, 100, 10]);
    });

    test('should generate the provided amount of random numbers with the provided max number. The numbers can not be repeated', () => {
        const lottery = lotteryGenerator(50, 7);

        expect(Array.from(lottery)).toEqual([1, 10, 35, 40, 50, 5, 25]);
    });

    test('should throw an error if it can not generate a new number after 5 retries', () => {
        const lottery = lotteryGenerator(4, 5);

        expect(() => Array.from(lottery)).toThrowError(
            'Error generating numbers'
        );
    });
});
