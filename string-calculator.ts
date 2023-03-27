interface IStringCalculator {
  add: (input: string) => number;
}

export class StringCalculator implements IStringCalculator {
  public add(input: string): number {
    if (!input.length) return 0;

    /* To check if custom delimiters have been implemented.
    Otherwise a default delimiter and the same input shall be used */
    let delimiter;
    let filteredInput = input;
    if (this.hasCustomDelimiter(filteredInput)) {
      delimiter = this.extractCustomDelimiter(input);
      filteredInput = this.extractCalculableInput(input);
    }

    return filteredInput
      .split(new RegExp(delimiter || '(?:\\n)|(?:,)'))
      .map((operand) => Number.parseInt(operand))
      .reduce((n, total) => total + n);
  }

  private extractCalculableInput(input: string) {
    return input.slice(3);
  }

  private extractCustomDelimiter(input: string) {
    return input[2];
  }

  private hasCustomDelimiter(input: string) {
    return input.startsWith('//');
  }
}
