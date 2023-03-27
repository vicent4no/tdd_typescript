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
    3. Allow the add() method to handle new lines between numbers (in addition to commas).
      3.1. the following input is ok: "1\n2,3" (will equal 6).
      3.2. the following input DOES NOT need to be handled: "1,\n" (no need to prove it)
    4. Support different delimiters
      4.1 To change a delimiter, the beggining of the string will contain a separate line specifying the custom delimiter. This input looks like this: "//{delimiter}\n{numbers...}"
      4.2 For example: "//;\n1;2" should return a result of 3 because the delimiter is a semicolumn now.
      4.3 The first line is optional (all existing scenarios should still work).
      4.4 Do not worry about supporting the specification of '\n' as an explicit custom delimiter.
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
  methodToBeTested: keyof StringCalculator,
) => {
  // Act
  const actual = sut[methodToBeTested](input);
  // Assert
  expect(actual).toBe(expected);
};

describe('StringCalculator', () => {
  describe('add', () => {
    describe('Empty string', () => {
      test.each([{ input: '', expected: 0 }])(
        'Input: "$input", Expected: $expected',
        (parameters) => {
          validationFunction(parameters, createSut(StringCalculator), 'add');
        },
      );
    });

    describe('One number', () => {
      test.each([
        { input: '2', expected: 2 },
        { input: '30', expected: 30 },
        { input: '257', expected: 257 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator), 'add');
      });
    });

    describe('Two numbers', () => {
      test.each([
        { input: '2,3', expected: 5 },
        { input: '5,4', expected: 9 },
        { input: '517,1003', expected: 1520 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator), 'add');
      });
    });

    describe('Many numbers', () => {
      test.each([
        { input: '2,3,7,10', expected: 22 },
        { input: '103,977,1,0', expected: 1081 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator), 'add');
      });
    });

    describe('Many numbers AND new lines', () => {
      test.each([
        { input: '2\n3\n7\n10', expected: 22 },
        { input: '103\n977\n1\n0', expected: 1081 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator), 'add');
      });
    });

    describe('Many numbers AND new lines AND commas', () => {
      test.each([
        { input: '2\n3,7\n10', expected: 22 },
        { input: '103,977,1\n0', expected: 1081 },
      ])('Input: "$input", Expected: $expected', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator), 'add');
      });
    });

    describe('Custom delimiter', () => {
      test.each([
        { input: '//;\n1;2', expected: 3 },
        { input: '//@\n2@20@50@3', expected: 75 },
      ])('Input: "$input", Expected: "$expected"', (parameters) => {
        validationFunction(parameters, createSut(StringCalculator), 'add');
      });
    });
  });
});
