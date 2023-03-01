interface IStringCalculator {
  add: (input: string) => number;
}

export class StringCalculator implements IStringCalculator {
  public add(input: string): number {
    if (!input.length) return 0;

    return input
      .split(',')
      .map((operand) => Number.parseInt(operand))
      .reduce((n, total) => total + n);
  }
}
