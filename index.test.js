const { expect } = require('chai');
const { add } = require('./index');

describe('add function', () => {
    it('should correctly add two positive numbers', () => {
        const result = add(3,5);
        expect(result).to.equal(8);
    });

    it('should correctly add a negative and a positive number', () => {
        const result = add(-3, 5);
        expect(result).to.equal(2);
    });

    it('should correctly add two negative numbers', () => {
        const result = add(-5, -7);
        expect(result).to.equal(-12);
    });

    it('should correctly add zero to a number', () => {
        const result = add(0, 10);
        expect(result).to.equal(10);
    });
})
