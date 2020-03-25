import each from 'jest-each';
import reverse from './reverse';

describe('reverse function', () => {
    each([
        ['hello world!', '!dlrow olleh'],
        ['With sóme str#nge chars', 'srahc egn#rts emós htiW'],
        ['With \n multiple \n lines', 'senil \n elpitlum \n htiW'],
    ]).test('should reverse the string "%s"', (str, reversedString) => {
        expect(reverse(str)).toEqual(reversedString);
    });
});
