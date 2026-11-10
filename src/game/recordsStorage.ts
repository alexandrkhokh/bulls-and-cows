import StorageHelper from "../utilities/StorageHelper.ts";
import { isRecordList, type RecordEntry } from "./records.ts";
import { availableLengths, RADIX_OPTIONS, type Settings } from "./settings.ts";

const storageKey = ({ length, base }: Settings) =>
  `bulls-and-cows:records:${base}:${length}`;

export const loadRecords = (settings: Settings): RecordEntry[] => {
  try {
    const stored = StorageHelper.get<unknown>(storageKey(settings));
    return isRecordList(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const saveRecords = (
  settings: Settings,
  records: readonly RecordEntry[],
): void => {
  try {
    StorageHelper.set(storageKey(settings), records);
  } catch (error) {
    console.error(error);
  }
};

export type Leaderboard = {
  readonly settings: Settings;
  readonly records: readonly RecordEntry[];
};

export const loadAllLeaderboards = (): Leaderboard[] =>
  RADIX_OPTIONS.flatMap(([, base]) =>
    availableLengths(base).map((length) => {
      const settings: Settings = { length, base };
      return { settings, records: loadRecords(settings) };
    }),
  ).filter(({ records }) => records.length > 0);
