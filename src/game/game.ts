import evaluateGuess from "../functions/evaluateGuess.ts";
import isValidGuess from "../functions/isValidGuess.ts";
import type { RecordEntry } from "./records.ts";
import type { Settings } from "./settings.ts";

export type Attempt = {
  readonly guess: string;
  readonly bulls: number;
  readonly cows: number;
};

export type Round = {
  readonly settings: Settings;
  readonly secret: string;
  readonly history: readonly Attempt[];
  readonly startedAt: number;
  readonly finishedAt: number | null;
};

export const startRound = (
  settings: Settings,
  secret: string,
  startedAt: number,
): Round => ({ settings, secret, history: [], startedAt, finishedAt: null });

export const isFinished = (round: Round): boolean => round.finishedAt !== null;

export const hasAttempt = (round: Round, guess: string): boolean =>
  round.history.some((attempt) => attempt.guess === guess.toLowerCase());

export const submitGuess = (
  round: Round,
  rawGuess: string,
  now: number,
): Round => {
  const guess = rawGuess.toLowerCase();
  const { length, base } = round.settings;

  if (
    isFinished(round) ||
    !isValidGuess(guess, length, base) ||
    hasAttempt(round, guess)
  ) {
    return round;
  }

  const attempt: Attempt = { guess, ...evaluateGuess(round.secret, guess) };

  return {
    ...round,
    history: [...round.history, attempt],
    finishedAt: attempt.bulls === length ? now : null,
  };
};

export const elapsedMs = (round: Round, now: number): number =>
  (round.finishedAt ?? now) - round.startedAt;

export const toRecord = (round: Round): RecordEntry | null =>
  round.finishedAt === null
    ? null
    : {
        attempts: round.history.length,
        timeMs: round.finishedAt - round.startedAt,
        finishedAt: round.finishedAt,
      };
