export enum Responses {
  Fizz = 'Fizz',
  Buzz = 'Buzz',
  FizzBuzz = 'FizzBuzz',
  Wizz = 'Wizz',
}

interface IFizzBuzz {
  check: (value: number) => Responses | string;
}

export class FizzBuzz implements IFizzBuzz {
  public check(value: number) {
    if (value === 1 || value === 2 || value === 7 || value === 11) {
      return Responses.Wizz;
    }
    if (value % 3 === 0 && value % 5 === 0) {
      return Responses.FizzBuzz;
    }
    if (value % 5 === 0) {
      return Responses.Buzz;
    }
    if (value % 3 !== 0 && value % 5 !== 0) {
      return String(value);
    }
    return Responses.Fizz;
  }
}
