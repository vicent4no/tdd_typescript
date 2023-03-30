/*
  Test doubles
  - fakes
  - stubs
  - mocks
*/

import { Copier, Source, Destination } from './character-copy';

describe('character-copy', () => {
  describe('copy', () => {
    describe('no character in source', () => {
      test('nothing in source', () => {
        // Arrange
        const source = createSource([]);
        const destination = createDestination();
        const sut = createCopier(source, destination);

        // Act
        sut.copy();

        // Assert
        expect(destination.writeChar).toBeCalledTimes(0);
      });
    });

    describe('one character in source with a newline', () => {
      test.each([{ char: 'a' }, { char: 'b' }, { char: '!' }])(
        'char: $char',
        ({ char }) => {
          // Arrange
          const source = createSource([char]);
          const destination = createDestination();
          const sut = createCopier(source, destination);

          // Act
          sut.copy();

          // Assert
          expect(destination.getWrittenCharacters()).toContain(char);
        },
      );
    });

    describe('multiple characters in source with a newline', () => {
      test.each([
        { chars: ['a', 'b', '!'] },
        { chars: ['a', 'b', '!', 'e', 'x'] },
        { chars: ['!', '$', '#', '}', '?'] },
        { chars: ['!', '!', '!', '}', '?'] },
      ])('chars: $chars', ({ chars }) => {
        // Arrange
        const source = createSource([...chars]);
        const destination = createDestination();
        const sut = createCopier(source, destination);

        // Act
        sut.copy();

        // Assert
        for (const char of chars) {
          expect(destination.getWrittenCharacters()).toContain(char);
        }
      });
    });

    describe('multiple characters are written in the correct order', () => {
      test.each([{ chars: ['a', 'b', 'b', 'b', 'c', '!'] }])(
        'chars: $chars',
        ({ chars }) => {
          // Arrange
          const source = createSource([...chars]);
          const destination = createDestination();
          const sut = createCopier(source, destination);

          // Act
          sut.copy();

          // Assert
          expect(destination.getWrittenCharacters()).toStrictEqual([...chars]);
        },
      );
    });

    describe('chars after \\n are not written', () => {
      test.each([
        { chars: ['z', 't', '\n', 'b', 'c', '!'], expected: ['z', 't'] },
        { chars: ['z', 't', 'b', '\n', '!'], expected: ['z', 't', 'b'] },
      ])('chars: $chars', ({ chars, expected }) => {
        // Arrange
        const source = createSource([...chars]);
        const destination = createDestination();
        const sut = createCopier(source, destination);

        // Act
        sut.copy();

        // Assert
        expect(destination.getWrittenCharacters()).toStrictEqual(expected);
      });
    });
  });
});

function createSource(chars: string[]) {
  const stubReadChar = jest.fn();

  stubReadChar.mockReturnValue('\n');

  for (const char of chars) {
    stubReadChar.mockReturnValueOnce(char);
  }

  return {
    readChar: stubReadChar,
  };
}

function createDestination() {
  const writtenCharacters: string[] = [];
  return {
    writeChar: jest.fn((c) => writtenCharacters.push(c)),
    getWrittenCharacters: () => writtenCharacters,
  };
}

function createCopier(source: Source, destination: Destination) {
  return new Copier(source, destination);
}
