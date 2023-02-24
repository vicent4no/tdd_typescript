export function greeter() {
  return {
    helloWorld: function () {
      return "Hello World!";
    },
    helloPerson(name: string) {
      return `Hello ${name}!`;
    },
  };
}
