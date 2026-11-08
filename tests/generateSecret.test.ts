import { describe, it, assert } from "vitest";
import generateSecret from "../src/functions/generateSecret.ts";

const seq = (values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};
describe("generateSecret", () => {
  it("returns a string", () => {
    assert.isString(generateSecret(4, 10), "return String");
  });

  it("returns a string of the requested length", () => {
    const length = 7;
    assert.lengthOf(
      generateSecret(length, 10),
      length,
      `returned string has length of ${length}`,
    );
  });

  it("uses only digits valid for the given base", () => {
    assert.match(generateSecret(2, 2), /^[01]{2}$/);
    assert.match(generateSecret(8, 8), /^[0-7]{8}$/);
    assert.match(generateSecret(10, 10), /^[0-9]{10}$/);
    assert.match(generateSecret(16, 16), /^[0-9A-F]{16}$/);
  });

  it("returns the same secret for the same random sequence", () => {
    assert.equal(
      generateSecret(4, 10, seq([0.1, 0.2, 0.3, 0.5])),
      generateSecret(4, 10, seq([0.1, 0.2, 0.3, 0.5])),
    );
  });

  it("returns only unique digits", () => {
    const result = generateSecret(
      6,
      10,
      seq([0.1, 0.2, 0.3, 0.5, 0.4, 0.2, 0.8]),
    );
    assert.equal(result.length, new Set(result).size);

    const resultHex = generateSecret(16, 16);
    assert.equal(resultHex.length, new Set(resultHex).size);
  });

  it("preserves a leading zero in the secret", () => {
    assert.equal(
      generateSecret(6, 10, seq([0, 0.2, 0.3, 0.5, 0.4, 0.2, 0.8])),
      "023548",
    );
  });

  it("throws RangeError when length is greater than base", () => {
    assert.throws(() => generateSecret(11, 10), RangeError);
  });

  it("throws RangeError when length is less than 1", () => {
    assert.throws(() => generateSecret(0, 10), RangeError);
  });
});
