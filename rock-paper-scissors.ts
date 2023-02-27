interface RockPaperScissors {
  play: (p1Move: RPSOptions, p2Move: RPSOptions) => RPSResponses;
}

export enum RPSOptions {
  ROCK,
  SCISSORS,
  PAPER,
}

export enum RPSResponses {
  PLAYER_1_WINS = 'Player 1 wins',
  PLAYER_2_WINS = 'Player 2 wins',
  TIE = 'Tie',
}

const mappedResponses = {
  '0': RPSResponses.TIE,
  '-1': RPSResponses.PLAYER_1_WINS,
  '2': RPSResponses.PLAYER_1_WINS,
  '-2': RPSResponses.PLAYER_2_WINS,
  '1': RPSResponses.PLAYER_2_WINS,
};

export function createRockPaperScissors(): RockPaperScissors {
  return {
    play(p1Move: RPSOptions, p2Move: RPSOptions): RPSResponses {
      return mappedResponses[
        String(p1Move - p2Move) as '0' | '-1' | '2' | '-2' | '1'
      ];
    },
  };
}
