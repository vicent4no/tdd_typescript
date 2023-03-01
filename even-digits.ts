export function areAllDigitsEven(number: number): boolean | Function {
  let num = number;
  if (num >= 10) {
    if (num % 2 !== 0) return false;
    num = Math.floor(num / 10);
  }
  return num >= 10 ? areAllDigitsEven(num) : num % 2 === 0;
}
