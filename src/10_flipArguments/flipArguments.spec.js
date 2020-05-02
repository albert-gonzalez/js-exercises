import flipArguments from './flipArguments';
import each from 'jest-each';

describe('flipArguments function', () => {
    test('should return a function', () => {
        expect(typeof flipArguments()).toBe('function');
    });

    describe('the returned function should have the arguments flipped', () => {
        each([
            ['Concat strings', 'A B C', 'D C B', (a, b, c) => `${a} ${b} ${c}`],
            [
                'Make an array',
                ['A', 'B', 'C', 'D'],
                ['D', 'C', 'B', 'A'],
                (a, b, c, d) => [a, b, c, d],
            ],
        ]).test(
            '%s: with the original function the result is "%s" and with the flipped arguments is "%s"',
            (description, originalResult, flippedResult, fn) => {
                const args = ['A', 'B', 'C', 'D'];
                expect(fn(...args)).toEqual(originalResult);
                expect(flipArguments(fn)(...args)).toEqual(flippedResult);
            }
        );
    });
});
