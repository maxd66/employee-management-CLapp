const { it, expect } = require('@jest/globals');
const Ask = require('../lib/Ask');

describe('Ask', () => {
    describe('validateLength', () => {
        it('if there are more than thirty characters or less than one in a name, it should return false and vice versa', () => {
            const ask = new Ask;
            const name = 'Joel';
            const longName = 'Geraldine Frankenschmitzerton the Clicker';
            const t = ask.validateLength(name);
            const f = ask.validateLength(longName);

            expect(t).toBe(true);
            expect(f).toBe(false);
        })
    })
    describe('validateInteger', () => {
        it('Should return false for anything other number character', () => {
            const ask = new Ask;
            const num = 'Ellie';
            const ans = ask.validateInteger(num);

            expect(ans).toBe(false)
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