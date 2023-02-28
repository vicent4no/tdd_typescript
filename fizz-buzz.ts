export enum Responses {
  Fizz = "Fizz"
}

interface IFizzBuzz {
  check: (value: number) => Responses;
}

export class FizzBuzz implements IFizzBuzz {
  public check(value: number) {
    return Responses.Fizz
  }
}