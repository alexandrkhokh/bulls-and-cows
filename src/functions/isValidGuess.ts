import createDigitValidator from "./createDigitValidator.ts";
import type { Radix } from "./constants.ts";

const isValidGuess = (guess: string, length: number, base: Radix) => {
  if (guess.length !== length) {
    return false;
  }
  const guessArr = guess.toLowerCase().split("");
  if (guessArr.length !== new Set(guessArr).size) {
    return false;
  }

  return guessArr.every(createDigitValidator(base));
};

export default isValidGuess;
