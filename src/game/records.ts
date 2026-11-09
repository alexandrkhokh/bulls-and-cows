export const TOP_N = 5;

export type RecordEntry = {
  readonly attempts: number;
  readonly timeMs: number;
  readonly finishedAt: number;
};

export const compareRecords = (a: RecordEntry, b: RecordEntry): number =>
  a.attempts - b.attempts || a.timeMs - b.timeMs;

export const addRecord = (
  records: readonly RecordEntry[],
  entry: RecordEntry,
  limit = TOP_N,
): RecordEntry[] =>
  [...records, entry].toSorted(compareRecords).slice(0, limit);

const isRecordEntry = (value: unknown): value is RecordEntry =>
  typeof value === "object" &&
  value !== null &&
  "attempts" in value &&
  "timeMs" in value &&
  "finishedAt" in value &&
  typeof value.attempts === "number" &&
  typeof value.timeMs === "number" &&
  typeof value.finishedAt === "number";

export const isRecordList = (value: unknown): value is RecordEntry[] =>
  Array.isArray(value) && value.every(isRecordEntry);
