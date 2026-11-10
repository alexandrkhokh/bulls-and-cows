import { RADIX, type Radix } from "../functions/constants.ts";

export const MIN_LENGTH = 2;
export const MAX_LENGTH = 6;

export type Settings = { readonly length: number; readonly base: Radix };

export const DEFAULT_SETTINGS: Settings = { length: 4, base: RADIX.dec };

export const ALL_LENGTHS: readonly number[] = Array.from(
  { length: MAX_LENGTH - MIN_LENGTH + 1 },
  (_, index) => MIN_LENGTH + index,
);

export const RADIX_OPTIONS = Object.entries(RADIX) as [
  keyof typeof RADIX,
  Radix,
][];

export const isRadix = (value: number): value is Radix =>
  RADIX_OPTIONS.some(([, base]) => base === value);

export const baseName = (base: Radix): string =>
  RADIX_OPTIONS.find(([, value]) => value === base)?.[0] ?? String(base);

export const availableLengths = (base: Radix): number[] =>
  ALL_LENGTHS.filter((length) => length <= base);

export const maxLength = (base: Radix): number => Math.min(MAX_LENGTH, base);

export const changeBase = (settings: Settings, base: Radix): Settings => ({
  base,
  length: Math.min(settings.length, maxLength(base)),
});

export const changeLength = (settings: Settings, length: number): Settings =>
  availableLengths(settings.base).includes(length)
    ? { ...settings, length }
    : settings;
