import { assert, describe, it } from "vitest";
import isValidGuess from "../src/functions/isValidGuess.ts";

describe("isValidGuess", () => {
  it("should return true for a valid guess", () => {
    assert.isTrue(isValidGuess("01", 2, 2));
    assert.isTrue(isValidGuess("01234567", 8, 8));
    assert.isTrue(isValidGuess("1234", 4, 10));
    assert.isTrue(isValidGuess("0123456789abcdef", 16, 16));
  });

  it("should reject a guess of the wrong length", () => {
    assert.isFalse(isValidGuess("12345", 4, 10));
    assert.isFalse(isValidGuess("125", 4, 10));
    assert.isFalse(isValidGuess("", 4, 10));
  });

  it("should contains digits only in base", () => {
    assert.isFalse(isValidGuess("3", 1, 2));
    assert.isFalse(isValidGuess("9", 1, 8));
    assert.isFalse(isValidGuess("a", 1, 10));
    assert.isFalse(isValidGuess("h", 1, 16));
  });

  it("should contains unique digits", () => {
    assert.isFalse(isValidGuess("11", 2, 2));
    assert.isFalse(isValidGuess("223", 3, 8));
    assert.isFalse(isValidGuess("991", 3, 10));
    assert.isFalse(isValidGuess("aa1", 3, 16));
    assert.isFalse(isValidGuess("aA", 2, 16));
  });

  it("should accept hex digits in upper and lower case", () => {
    assert.isTrue(isValidGuess("A1", 2, 16));
    assert.isTrue(isValidGuess("a1", 2, 16));
  });

  it("should accept a leading zero", () => {
    assert.isTrue(isValidGuess("0123", 4, 10));
  });
});
