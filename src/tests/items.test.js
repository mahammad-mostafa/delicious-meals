/**
 * @jest-environment jsdom
 */

import Count from '../modules/items.js';

describe('Counting function for number of items elements inside parent element', () => {
  test('When parent element node does not exist it should throw an error', () => {
    // Arrange
    const list = document.querySelector('#list');
    // Act & Assert
    expect(() => Count(list)).toThrow('List does not exist!');
  });
  test('When parent element node is empty it should return zero', () => {
    // Arrange
    document.body.innerHTML = '<ul id="list"></ul>';
    const list = document.querySelector('#list');
    // Act & Assert
    expect(Count(list)).toEqual(0);
  });
  test('When parent element node contains two items it should return 2', () => {
    // Arrange
    document.body.innerHTML = '<ul id="list"><li></li><li></li></ul>';
    const list = document.querySelector('#list');
    // Act & Assert
    expect(Count(list)).toEqual(2);
  });
});