import { greeter } from './greeter';

describe('greeter', () => {
  describe('helloWorld', () => {
    it("should return 'Hello World!'", () => {
      // Arrange
      // State, services or SUT
      const sut = greeter(); // sut -> system under test
      const expected = 'Hello World!';

      // Act
      const actual = sut.helloWorld(); // Act should ALWAYS be one liner for unit testing

      // Assert
      expect(actual).toBe(expected); // We should ALWAYS check one thing. Or one idea.
    });
  });

  describe('helloPerson', () => {
    it("should return 'Hello !' given '' name variable ", () => {
      // Arrange
      const sut = greeter();
      const input = '';
      const expected = 'Hello !';

      // Act
      const actual = sut.helloPerson(input);

      // Assert
      expect(actual).toBe(expected);
    });

    it("should return 'Hello Peter!' given 'Peter' name variable ", () => {
      // Arrange
      const sut = greeter();
      const input = 'Peter';
      const expected = 'Hello Peter!';

      // Act
      const actual = sut.helloPerson(input);

      // Assert
      expect(actual).toBe(expected);
    });
  });
});
