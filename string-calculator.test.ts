/* 
  Theory to remember:
    - The one to many green bar pattern
    - The obvious green bar pattern
    - The backout green bar pattern
    - The learning test green bar pattern
    - The TDD Gears model
*/

import { StringCalculator } from './string-calculator';

/*
  String KATA first step:
    1. Create a simple String calculator with a function: add(input: string): number

      1.1 The add() funciton can take 0, 1 or 2 numbers and will return their sum
      (for an empty string it will return 0). i.e. "", "1", "1,2"
      
      1.2 Start with the simplest test case of an empty string. Then move to one. Then move to two.
    
    2. Allow the add() function to handle an unknown amount of numbers.
*/

const createSut = <T>(sutClass: { new (): T }): T => {
  return new sutClass();
};

const validationFunction = (
  {
    input,
    expected,
  }: {
    input: string;
    expected: number;
  },
  sut: StringCalculator,
) => {
  // Act
  const actual = sut.add(input);
  // Assert
  expect(actual).toBe(expected);
};

describe('StringCalculator', () => {
  describe('add', () => {
    describe('Empty string', () => {
      test.each([{ input: '', expected: 0 }])(
        'Input: "$input", Expected: $expected',
        (parameters) => {
          validationFunction(parameters, createSut(StringCalculator));
        },
      );
    });

    describe('One number', () => {
      test.each([
        { input: '2', expected: 2 },
        { input: '30', expected: 30 },
        { input: '257', expected: 257 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator));
      });
    });

    describe('Two numbers', () => {
      test.each([
        { input: '2,3', expected: 5 },
        { input: '5,4', expected: 9 },
        { input: '517,1003', expected: 1520 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator));
      });
    });

    describe('Many numbers', () => {
      test.each([
        { input: '2,3,7,10', expected: 22 },
        { input: '103,977,1,0', expected: 1081 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator));
      });
    });
  });
});
