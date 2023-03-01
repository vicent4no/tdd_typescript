/*
  Returns true if all the digits of a number are even.
  Returns false if any of the digits of a number are odd.
    - 123: false
    - 222: true
    - 2: true
    - 3: false
    - 2468: true
    - 3468: false
*/

import { areAllDigitsEven } from './even-digits';

const validationFunction = ({
  input,
  expected,
}: {
  input: number;
  expected: boolean;
}) => {
  // Arrange
  const sut = areAllDigitsEven;
  // Act
  const actual = sut(input);
  // Assert
  expect(actual).toBe(expected);
};

describe('areAllDigitsEven', () => {
  describe('One digit number', () => {
    test.each([
      { input: 0, expected: true },
      { input: 1, expected: false },
      { input: 4, expected: true },
    ])('Input: $input, expected: $expected', (parameters) => {
      validationFunction(parameters);
    });
  });

  describe('Two digits number', () => {
    test.each([
      { input: 10, expected: false },
      { input: 30, expected: false },
      { input: 99, expected: false },
      { input: 75, expected: false },
      { input: 80, expected: true },
      { input: 62, expected: true },
    ])('Input: $input, expected: $expected', (parameters) => {
      validationFunction(parameters);
    });
  });

  describe('Many digits', () => {
    test.each([
      { input: 123, expected: false },
      { input: 222, expected: true },
      { input: 2468, expected: true },
      { input: 3468, expected: false },
    ])('Input: $input, expected: $expected', (parameters) => {
      validationFunction(parameters);
    });
  });
});
