const { it, expect } = require('@jest/globals');
const Ask = require('../lib/Ask');

describe('Ask', () => {
    describe('validateName', () => {
        it('if there are more than thirty characters or less than one in a name, it should return false and vice versa', () => {
            const ask = new Ask;
            const name = 'Joel';
            const longName = 'Geraldine Frankenschmitzerton the Clicker';
            const t = ask.validateName(name);
            const f = ask.validateName(longName);

            expect(t).toBe(true);
            expect(f).toBe(false);
        })
    })
    describe('validateInteger', () => {
        it('Should return false for anything other number character', () => {
            const ask = new Ask;
            const num = 'Ellie';
            const num2 = ']';
            const ans = ask.validateInteger(num);
            const ans2 = ask.validateInteger(num2);

            expect(ans).toBe(false)
            expect(ans2).toBe(false)
        })
        it('Should return false for any number that is not an integer', () => {
            const ask = new Ask;
            const num = 12.2;
            const ans = ask.validateInteger(num);

            expect(ans).toBe(false)
        })
        it('Should return true for integers', () => {
            const ask = new Ask;
            const num = 12;
            const ans = ask.validateInteger(num);

            expect(ans).toBe(true)
        })
    })
})