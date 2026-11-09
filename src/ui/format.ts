import { DIGITS, type Radix } from "../functions/constants.ts";

export const formatSeconds = (ms: number): string =>
  `${(ms / 1000).toFixed(1)} s`;

export const alphabetLabel = (base: Radix): string =>
  base <= 10
    ? `0–${base - 1}`
    : `0–9, A–${DIGITS[base - 1]?.toUpperCase() ?? ""}`;
