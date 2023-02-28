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
    if (value % 3 === 0 && value % 5 === 0) {
      return Responses.FizzBuzz;
    }
    if (value % 3 !== 0 && value % 5 === 0) {
      return Responses.Buzz;
    }
    if (value % 3 === 0 && value % 5 !== 0) {
      return Responses.Fizz
    }
    if (
      value === 1 ||
      value === 2 ||
      value === 7 ||
      (value % 2 !== 0 && value % 3 !== 0 && value % 5 !== 0)
    ) {
      return Responses.Wizz;
    }
    return String(value);
  }
}
