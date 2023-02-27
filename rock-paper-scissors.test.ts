/*
  The 3 laws of TDD:
    1. You are not allowed to write any production code unless it is to make a failing unit test pass.
    2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
    3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.
    Red -> Green -> Reflect -> Refactor
    "Fake It Green Bar" pattern
*/

import {
  createRockPaperScissors,
  RPSOptions,
  RPSResponses,
} from './rock-paper-scissors';

describe('rock-paper-scissors', () => {
  describe('play', () => {
    describe('Rock beats scissors', () => {
      test(`player1 chooses rock and player2 chooses scissors. Should return "${RPSResponses.PLAYER_1_WINS}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.PLAYER_1_WINS;
        const player1Move = RPSOptions.ROCK;
        const player2Move = RPSOptions.SCISSORS;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });

      test(`player1 chooses scissors and player2 chooses rock. Should return "${RPSResponses.PLAYER_2_WINS}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.PLAYER_2_WINS;
        const player1Move = RPSOptions.SCISSORS;
        const player2Move = RPSOptions.ROCK;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });
    });

    describe('Scissors beats paper', () => {
      test(`player1 chooses scissors and player2 chooses paper. Should return "${RPSResponses.PLAYER_1_WINS}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.PLAYER_1_WINS;
        const player1Move = RPSOptions.SCISSORS;
        const player2Move = RPSOptions.PAPER;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });

      test(`player1 chooses paper and player2 chooses scissors. Should return "${RPSResponses.PLAYER_2_WINS}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.PLAYER_2_WINS;
        const player1Move = RPSOptions.PAPER;
        const player2Move = RPSOptions.SCISSORS;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });
    });

    describe('Paper beats rock', () => {
      test(`player1 chooses paper and player2 chooses rock. Should return "${RPSResponses.PLAYER_1_WINS}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.PLAYER_1_WINS;
        const player1Move = RPSOptions.PAPER;
        const player2Move = RPSOptions.ROCK;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });

      test(`player1 chooses rock and player2 chooses paper. Should return "${RPSResponses.PLAYER_2_WINS}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.PLAYER_2_WINS;
        const player1Move = RPSOptions.ROCK;
        const player2Move = RPSOptions.PAPER;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });
    });

    describe('Same element is a tie', () => {
      test(`player1 chooses paper and player2 chooses paper. Should return "${RPSResponses.TIE}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.TIE;
        const player1Move = RPSOptions.PAPER;
        const player2Move = RPSOptions.PAPER;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });

      test(`player1 chooses rock and player2 chooses rock. Should return "${RPSResponses.TIE}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.TIE;
        const player1Move = RPSOptions.ROCK;
        const player2Move = RPSOptions.ROCK;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });

      test(`player1 chooses scissors and player2 chooses scissors. Should return "${RPSResponses.TIE}"`, () => {
        // Arrange
        const sut = createRockPaperScissors();
        const expected = RPSResponses.TIE;
        const player1Move = RPSOptions.SCISSORS;
        const player2Move = RPSOptions.SCISSORS;

        // Act
        const actual = sut.play(player1Move, player2Move);

        // Assert
        expect(actual).toBe(expected);
      });
    });
  });
});
