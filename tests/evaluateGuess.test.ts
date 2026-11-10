import { describe, it, assert } from "vitest";
import evaluateGuess from "../src/functions/evaluateGuess.ts";

describe("evaluateGuess", () => {
  it("returns object", () => {
    assert.deepEqual(evaluateGuess("1234", "1324"), { bulls: 2, cows: 2 });
    assert.deepEqual(evaluateGuess("1234", "7891"), { bulls: 0, cows: 1 });
    assert.deepEqual(evaluateGuess("1234", "1789"), { bulls: 1, cows: 0 });
    assert.deepEqual(evaluateGuess("1234", "1234"), { bulls: 4, cows: 0 });
    assert.deepEqual(evaluateGuess("1234", "4321"), { bulls: 0, cows: 4 });
    assert.deepEqual(evaluateGuess("0234", "3210"), { bulls: 1, cows: 2 });
    assert.deepEqual(evaluateGuess("1234", "5678"), { bulls: 0, cows: 0 });
    assert.deepEqual(evaluateGuess("1ab2", "1AB2"), { bulls: 4, cows: 0 });
    assert.deepEqual(evaluateGuess("1ac2", "1A2C"), { bulls: 2, cows: 2 });
  });

  it("does not use manual loops", () => {
    const fn = evaluateGuess.toString();
    assert.notMatch(fn, /\b(for|while|do)\b/);
  });
});
