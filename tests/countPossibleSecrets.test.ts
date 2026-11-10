import { assert, describe, it } from "vitest";
import countPossibleSecrets from "../src/functions/countPossibleSecrets.ts";

describe("countPossibleSecrets", () => {
  const radix = [[2], [8], [10], [16]];
  it.each([
    [3, 10, 720],
    [4, 8, 1680],
    [4, 10, 5040],
    [4, 16, 43680],
    [6, 10, 151200],
    [6, 16, 5765760],
  ])("length=%i, base=%i -> %i", (length, base, expected) => {
    assert.equal(countPossibleSecrets(length, base), expected);
  });

  it.each(radix)("length 1 returns base (%i)", (base) => {
    assert.equal(countPossibleSecrets(1, base), base);
  });

  it.each(radix)("length 0 returns 1 (base=%i)", (base) => {
    assert.equal(countPossibleSecrets(0, base), 1);
  });

  it("length = base should return base!", () => {
    assert.equal(countPossibleSecrets(2, 2), 2);
    assert.equal(countPossibleSecrets(8, 8), 40320);
  });

  it.each([
    [3, 2],
    [5, 2],
    [6, 2],
    [5, 4],
  ])("length=%i > base=%i returns 0", (length, base) => {
    assert.equal(countPossibleSecrets(length, base), 0);
  });
});
