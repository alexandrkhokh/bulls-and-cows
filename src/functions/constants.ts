export const RADIX = { bin: 2, oct: 8, dec: 10, hex: 16 } as const;
export type Radix = (typeof RADIX)[keyof typeof RADIX]; // 2 | 8 | 10 | 16

export const DIGITS = "0123456789abcdef";
