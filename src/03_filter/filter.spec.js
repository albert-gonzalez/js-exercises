import each from 'jest-each';
import filter from './filter';

describe('filter function', () => {
    test('should accept 2 parameters: an array and a callback', () => {
        expect(typeof filter).toBe('function');
        filter([0, 1, 2], current => current);
    });

    test('The callback will be executed for each value of the array. The callback with receive the current value, the current index and the array', () => {
        let currentSpy;
        let indexSpy;
        let arraySpy;
        filter(
            [1],
            (current, index, array) => {
                currentSpy = current;
                indexSpy = index;
                arraySpy = array;

                return current;
            },
            0
        );

        expect(currentSpy).toEqual(1);
        expect(indexSpy).toEqual(0);
        expect(arraySpy).toEqual([1]);
    });

    describe('should return a new array with the filtered values of the supplied array. If the callback returns a truthy value for a value, that value will be in the filtered array', () => {
        each([
            [
                'Filter even numbers',
                [1, 2, 3, 4, 5, 6, 10, 11, 12],
                value => value % 2 === 0,
                [2, 4, 6, 10, 12],
            ],
            [
                'Filter truthy values',
                [{}, 2, 0, false, '', 'hi', [1], []],
                value => value,
                [{}, 2, 'hi', [1], []],
            ],
            [
                'Filter values with "id" key',
                [{ id: 1 }, { name: 'AA' }, { id: 5, name: 'BB' }],
                value => 'id' in value,
                [{ id: 1 }, { id: 5, name: 'BB' }],
            ],
        ]).test('%s', (text, array, filterFunction, filteredArray) => {
            expect(filter(array, filterFunction)).toEqual(filteredArray);
        });
    });
});
