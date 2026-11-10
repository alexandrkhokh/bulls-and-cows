import { DIGITS, type Radix } from "./constants.ts";
const createDigitValidator = (base: Radix) => {
  const allowed = DIGITS.slice(0, base);
  return (char: string) =>
    char.length === 1 && allowed.includes(char.toLowerCase());
};

export default createDigitValidator;
