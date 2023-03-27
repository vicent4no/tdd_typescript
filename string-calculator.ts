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

    const parsedNumbers = this.parseAndFilterNumbers(filteredInput, delimiter);

    // Must throw an error if there were any negative numbers
    const negativeNumbers = this.filterNegativeNumbers(parsedNumbers);
    this.throwOnNegatives(negativeNumbers);

    return this.sumAll(parsedNumbers);
  }

  private parseAndFilterNumbers(
    filteredInput: string,
    delimiter: string | undefined,
  ) {
    return filteredInput
      .split(new RegExp(delimiter || '(?:\\n)|(?:,)'))
      .map((operand) => Number.parseInt(operand))
      .filter((number) => number <= 1000);
  }

  private sumAll(parsedNumbers: number[]): number {
    return parsedNumbers.reduce((n, total) => total + n);
  }

  private throwOnNegatives(negativeNumbers: number[]) {
    if (negativeNumbers.length)
      throw `Negatives not allowed: ${negativeNumbers.join(',')}`;
  }

  private filterNegativeNumbers(parsedNumbers: number[]) {
    return parsedNumbers.filter((number) => number < 0);
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
