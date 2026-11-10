import { describe, expect, it } from "vitest";
import createDigitValidator from "../src/functions/createDigitValidator.ts";

describe("createDigitValidator", () => {
  it("returns a function", () => {
    expect(typeof createDigitValidator(10)).toBe("function");
  });

  it("bin accepts only 0 and 1", () => {
    const isDigit = createDigitValidator(2);
    expect(["0", "1"].every(isDigit)).toBe(true);
    expect(isDigit("2")).toBe(false);
  });

  it("oct accepts 0-7", () => {
    const isDigit = createDigitValidator(8);
    expect(isDigit("7")).toBe(true);
    expect(isDigit("8")).toBe(false);
  });

  it("dec accepts 0-9 and rejects letters", () => {
    const isDigit = createDigitValidator(10);
    expect(isDigit("9")).toBe(true);
    expect(isDigit("a")).toBe(false);
  });

  it("hex accepts 0-9 a-f in any case", () => {
    const isDigit = createDigitValidator(16);
    expect(isDigit("a")).toBe(true);
    expect(isDigit("A")).toBe(true);
    expect(isDigit("f")).toBe(true);
    expect(isDigit("g")).toBe(false);
  });

  it("rejects empty and multi-character strings", () => {
    const isDigit = createDigitValidator(16);
    expect(isDigit("")).toBe(false);
    expect(isDigit("ab")).toBe(false);
  });
});
