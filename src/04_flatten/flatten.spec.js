import each from 'jest-each';
import flatten from './flatten';

describe('flatten function', () => {
    each([
        [
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
        ],
        [
            [
                [1, 2],
                [3, { a: 'a' }, 5],
            ],
            [1, 2, 3, { a: 'a' }, 5],
        ],
        [
            [[1, 'A'], [[3, [4, [5]]]]],
            [1, 'A', 3, 4, 5],
        ],
    ]).test('should flatten the array "%j"', (arr, flatArray) => {
        expect(flatten(arr)).toEqual(flatArray);
    });
});
