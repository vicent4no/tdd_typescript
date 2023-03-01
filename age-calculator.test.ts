/* 
  Stages of naming:
    - Meaningless
    - Accurate
    - Precise
    - Meaningful
*/

import { AgeCalculator } from './age-calculator';

const validateTest = ({
  birthDate,
  targetDate,
  expected,
}: {
  birthDate: string;
  targetDate: string;
  expected: number;
}) => {
  // Arrange
  const sut = new AgeCalculator();

  // Act
  const actual = sut.calculate(new Date(birthDate), new Date(targetDate));

  // Assert
  expect(actual).toBe(expected);
};

describe('AgeCalculator', () => {
  describe('Already had birthday in the year', () => {
    test.each([
      { birthDate: '1997/12/18', targetDate: '2023/12/19', expected: 26 },
      { birthDate: '2000/05/01', targetDate: '2043/05/30', expected: 43 },
      { birthDate: '2015/03/10', targetDate: '2022/03/21', expected: 7 },
    ])(
      'birth date: $birthDate, target date: $targetDate, expect: $expected',
      (parameters) => {
        validateTest(parameters);
      },
    );
  });

  describe('Did not have birthday already in the year', () => {
    test.each([
      { birthDate: '1997/12/18', targetDate: '2023/12/17', expected: 25 },
      { birthDate: '2000/05/01', targetDate: '2043/04/28', expected: 42 },
      { birthDate: '2015/03/10', targetDate: '2022/03/07', expected: 6 },
    ])(
      'birth date: $birthDate, target date: $targetDate, expect: $expected',
      (parameters) => {
        validateTest(parameters);
      },
    );
  });

  describe('Birthday is the same day', () => {
    test.each([
      { birthDate: '2001/01/01', targetDate: '2021/01/01', expected: 20 },
    ])(
      'birth date: $birthDate, target date: $targetDate, expect: $expected',
      (parameters) => {
        validateTest(parameters);
      },
    );
  });

});
