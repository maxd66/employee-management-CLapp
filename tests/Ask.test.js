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
})