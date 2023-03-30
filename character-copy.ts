export interface Source {
  readChar: () => string;
}

export interface Destination {
  writeChar: (char: string) => void;
}

export class Copier {
  constructor(
    private readonly source: Source,
    private readonly destination: Destination,
  ) {}

  public copy(): void {
    let char = this.source.readChar();
    while (char !== '\n') {
      this.destination.writeChar(char);
      char = this.source.readChar();
    }
  }
}
