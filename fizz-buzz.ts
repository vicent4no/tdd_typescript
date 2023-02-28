interface IFizzBuzz {
  check: (value: number) => Responses | string;
}

export enum Responses {
  Fizz = 'Fizz',
  Buzz = 'Buzz',
  Wizz = 'Wizz',
}
export class FizzBuzz implements IFizzBuzz {
  private isPrime(num: number): boolean {
    if (num === 1) return false;
    for (let factor = 2; factor <= Math.sqrt(num); factor++) {
      if (num % factor === 0) return false;
    }
    return true;
  }

  public check(value: number) {
    if (value === 3) return Responses.Fizz + Responses.Wizz;

    if (value === 5) return Responses.Buzz + Responses.Wizz;

    if (value % 15 === 0) return Responses.Fizz + Responses.Buzz;

    if (value % 5 === 0) return Responses.Buzz;

    if (value % 3 === 0) return Responses.Fizz;

    if (this.isPrime(value)) {
      return Responses.Wizz;
    }
    return String(value);
  }
}
