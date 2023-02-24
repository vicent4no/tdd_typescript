import { greeter } from "./greeter";

describe("greeter", () => {
  test("helloWorld given default should return Hello World!", () => {
    const sut = greeter(); // sut -> system under test
    const expected = "Hello World!";

    const actual = sut.helloWorld();

    expect(actual).toBe(expected);
  });
});
