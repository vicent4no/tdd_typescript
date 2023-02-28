import { FizzBuzz } from './fizz-buzz';

describe('FizzBuzz', () => {
  describe('check', () => {
    describe('numbers divisible by 3', () => {
      it('should return "Fizz"', () => {
        // Arrange
        const sut = new FizzBuzz();
        const expected = 'Fizz';
        const number = 3;

        // Act
        const actual = sut.check(number);

        // Assert
        expect(actual).toBe(expected);
      });
    });
  });
});
