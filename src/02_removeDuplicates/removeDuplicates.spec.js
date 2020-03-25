import each from 'jest-each';
import removeDuplicates from './removeDuplicates';

describe('removeDupliates function', () => {
    each([
        ['this this is is a a test test', 'this is a test'],
        ['this is a test this is a test', 'this is a test'],
    ]).test(
        'should remove duplicated words from "%s"',
        (str, stringWithoutDuplicates) => {
            expect(removeDuplicates(str)).toEqual(stringWithoutDuplicates);
        }
    );
});
