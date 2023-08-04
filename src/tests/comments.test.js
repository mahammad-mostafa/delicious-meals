const { expect } = require('@jest/globals');
import counter from '../modules/counter';

describe('Test comments counter function', () => {
    test('counter function with an null param returns 0', () => {
        expect(counter(null)).toBe(0);
    });

    test('counter function with an undefined param returns 0', () => {
        expect(counter(undefined)).toBe(0);
    });

    test('counter function with a HTMLElement that has no child Element returns 0', () => {
        document.body.innerHTML = `<ul id='list'></ul>`;
        const list = document.getElementById('list');
        expect(counter(list)).toBe(0);
    });

    test('counter function with a HTMLElement that has 2 children Elements returns 2', () => {
        document.body.innerHTML = `<ul id='list'><li>One Comment</li><li>Two Comments</li></ul>`;
        const list = document.getElementById('list');
        expect(counter(list)).toBe(2);
    });
})










