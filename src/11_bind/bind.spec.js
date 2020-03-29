import bind from './bind';

describe('bind function', () => {
    test('should return a function', () => {
        expect(typeof bind()).toBe('function');
    });

    test('returned function should be the original function bound to the supplied context in the bind function', () => {
        const context = {};
        const bound = bind(function() {
            this.a = 'hi';

            return this.a;
        }, context);

        bound();

        expect(context.a).toEqual('hi');
        expect(bound()).toEqual('hi');
    });

    test('returned function should accept the parameters of the original function', () => {
        const context = {};
        const bound = bind(function(num1, num2) {
            this.a = num1 + num2;

            return this.a;
        }, context);

        expect(bound(2, 4)).toEqual(6);
        expect(bound(2, 8)).toEqual(10);
        expect(bound(1, 11)).toEqual(12);

        expect(context.a).toEqual(12);
    });
});
