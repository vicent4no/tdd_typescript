/*
  Test doubles
  - fakes
  - stubs
  - mocks
*/

import { Copier, Source, Destination } from './character-copy';

describe('character-copy', () => {
  describe('copy', () => {
    /*     test('nothing in source', () => {
      // Arrange
      const stubReadChar = jest.fn();
      const source: Source = {
        readChar: stubReadChar,
      };
      const mockWriteChar = jest.fn();
      const destination: Destination = {
        writeChar: mockWriteChar,
      };

      const sut = new Copier(source, destination);
      // Act
      sut.copy();
      // Assert
      expect(mockWriteChar).toBeCalledTimes(0);
    });
 */
    describe('one character in source with a newline', () => {
      test.each([{ char: 'a' }, { char: 'b' }, { char: '!' }])(
        'char: $char',
        ({ char }) => {
          // Arrange
          const stubReadChar = jest.fn();
          stubReadChar.mockReturnValue('\n').mockReturnValueOnce(char);
          const source: Source = {
            readChar: stubReadChar,
          };
          const mockWriteChar = jest.fn();
          const destination: Destination = {
            writeChar: mockWriteChar,
          };

          const sut = new Copier(source, destination);
          // Act
          sut.copy();
          // Assert
          expect(mockWriteChar).toHaveBeenCalledTimes(1);
          expect(mockWriteChar).toHaveBeenCalledWith(char);
        },
      );
    });

    describe('multiple characters in source with a newline', () => {
      test.each([{ chars: ['a', 'b', '!'] }])('chars: $chars', ({ chars }) => {
        // Arrange
        const stubReadChar = jest.fn();
        stubReadChar.mockReturnValue('\n');
        stubReadChar.mockReturnValueOnce(chars[0]);
        stubReadChar.mockReturnValueOnce(chars[1]);
        stubReadChar.mockReturnValueOnce(chars[2]);
        const source: Source = {
          readChar: stubReadChar,
        };
        const mockWriteChar = jest.fn();
        const destination: Destination = {
          writeChar: mockWriteChar,
        };

        const sut = new Copier(source, destination);
        // Act
        sut.copy();
        // Assert
        expect(mockWriteChar).toHaveBeenCalledTimes(chars.length);
        expect(mockWriteChar).toHaveBeenCalledWith(chars[0]);
        expect(mockWriteChar).toHaveBeenCalledWith(chars[1]);
        expect(mockWriteChar).toHaveBeenCalledWith(chars[2]);
      });
    });
  });
});

function createMockFunction(captureFn) {
  return jest.fn(captureFn);
}

class CharacterCopyHelper {
  private timesWriteCharBeenCalled = 0;
  get getTimesWriteCharBeenCalled() {
    return this.timesWriteCharBeenCalled;
  }
}
