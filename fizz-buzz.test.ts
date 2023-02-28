/*
  The 3 laws of TDD:
    1. You are not allowed to write any production code unless it is to make a failing unit test pass.
    2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
    3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.
    Red -> Green -> Reflect -> Refactor
    "Fake It Green Bar" pattern
*/

/**
  Boundaries and equivalence partitions
  Triangulation Green Bar Pattern
  Test cases (.each())
*/

import { FizzBuzz, Responses } from './fizz-buzz';

const validationFunction = ({
  input,
  expected,
}: {
  input: number;
  expected: Responses | string;
}) => {
  const sut = new FizzBuzz();

  // Act
  const actual = sut.check(input);

  // Assert
  expect(actual).toBe(expected);
};

describe(FizzBuzz.name, () => {
  describe('check', () => {
    describe('numbers divisible by 3 (not including 3) but not by 5', () => {
      test.each([
        { input: 6, expected: Responses.Fizz },
        { input: 9, expected: Responses.Fizz },
        { input: 12, expected: Responses.Fizz },
      ])('given $input should return $expected', (parameters) => {
        validationFunction(parameters);
      });
    });
    describe('numbers not divisible by 3 but by 5 (not including 5)', () => {
      test.each([
        { input: 10, expected: Responses.Buzz },
        { input: 20, expected: Responses.Buzz },
        { input: 25, expected: Responses.Buzz },
      ])('given $input should return $expected', (parameters) => {
        validationFunction(parameters);
      });
    });
    describe('numbers divisible by 3 and 5', () => {
      test.each([
        { input: 15, expected: Responses.Fizz + Responses.Buzz },
        { input: 30, expected: Responses.Fizz + Responses.Buzz },
        { input: 45, expected: Responses.Fizz + Responses.Buzz },
      ])('given $input should return $expected', (parameters) => {
        validationFunction(parameters);
      });
    });
    describe('3 and 5', () => {
      test.each([
        { input: 3, expected: Responses.Fizz + Responses.Wizz },
        { input: 5, expected: Responses.Buzz + Responses.Wizz },
      ])('given $input should return $expected', (parameters) => {
        validationFunction(parameters);
      });
    });
    describe('numbers not divisible by 3 and neither by 5', () => {
      test.each([
        { input: 1, expected: "1" },
        { input: 4, expected: '4' },
        { input: 8, expected: '8' },
        { input: 26, expected: '26' },
        { input: 169, expected: '169' },
        { input: 289, expected: '289' },
      ])('given $input should return $expected', (parameters) => {
        validationFunction(parameters);
      });
    });
    describe('prime numbers that are not 3 and 5', () => {
      test.each([
        { input: 2, expected: Responses.Wizz },
        { input: 7, expected: Responses.Wizz },
        { input: 103, expected: Responses.Wizz },
      ])('given $input should return $expected', (parameters) => {
        validationFunction(parameters);
      });
    });
  });
});
