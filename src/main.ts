import "./style.css";
import "./styles/main.scss";
import generateSecret from "./functions/generateSecret.ts";
import {
  isFinished,
  startRound,
  submitGuess,
  toRecord,
  type Round,
} from "./game/game.ts";
import { addRecord } from "./game/records.ts";
import { loadRecords, saveRecords } from "./game/recordsStorage.ts";
import { DEFAULT_SETTINGS, type Settings } from "./game/settings.ts";
import createEl from "./utilities/createEl.ts";
import renderGameScreen from "./ui/gameScreen.ts";
import showHighScores from "./ui/highScoresModal.ts";
import renderSettingsScreen from "./ui/settingsScreen.ts";

type AppState = {
  readonly settings: Settings;
  readonly round: Round | null;
};

const root = createEl({ className: "app" });
document.body.prepend(root);

let state: AppState = { settings: DEFAULT_SETTINGS, round: null };

const setState = (next: AppState) => {
  state = next;
  render();
};

const startGame = () => {
  const { settings } = state;
  const secret = generateSecret(settings.length, settings.base);
  setState({ settings, round: startRound(settings, secret, Date.now()) });
};

const handleGuess = (guess: string): boolean => {
  const { round, settings } = state;
  if (!round) {
    return false;
  }

  const nextRound = submitGuess(round, guess, Date.now());
  if (nextRound === round) {
    return false;
  }

  const record = isFinished(nextRound) ? toRecord(nextRound) : null;
  if (record) {
    saveRecords(settings, addRecord(loadRecords(settings), record));
  }

  setState({ settings, round: nextRound });
  return true;
};

const restoreFocus = (previous: Element | null) => {
  const isSetting =
    previous instanceof HTMLSelectElement ||
    (previous instanceof HTMLInputElement && previous.type === "range");
  const target = isSetting
    ? root.querySelector(`[name="${previous.name}"]`)
    : root.querySelector(".guess-input:not(:disabled)");

  if (target instanceof HTMLElement) {
    target.focus();
  }
};

function render() {
  const previous = document.activeElement;
  const { settings, round } = state;

  const onShowHighScores = () =>
    showHighScores(settings, round?.finishedAt ?? null);

  root.replaceChildren(
    round
      ? renderGameScreen({
          round,
          onGuess: handleGuess,
          onNewGame: () => setState({ settings, round: null }),
          onShowHighScores,
        })
      : renderSettingsScreen({
          settings,
          onChange: (next) => setState({ settings: next, round: null }),
          onStart: startGame,
          onShowHighScores,
        }),
  );

  restoreFocus(previous);
}

render();
