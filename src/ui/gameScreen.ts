import createDigitValidator from "../functions/createDigitValidator.ts";
import isValidGuess from "../functions/isValidGuess.ts";
import { elapsedMs, isFinished, type Round } from "../game/game.ts";
import { baseName } from "../game/settings.ts";
import createEl from "../utilities/createEl.ts";
import { alphabetLabel, formatSeconds } from "./format.ts";
import createTable from "../utilities/createTable.ts";

type Props = {
  round: Round;
  onGuess: (guess: string) => boolean;
  onNewGame: () => void;
  onShowHighScores: () => void;
};

export default function renderGameScreen({
  round,
  onGuess,
  onNewGame,
  onShowHighScores,
}: Props) {
  const { length, base } = round.settings;
  const finished = isFinished(round);
  const isDigit = createDigitValidator(base);
  const defaultHint = `Enter ${length} different digits (${alphabetLabel(base)})`;

  const newGameButton = createEl({ tag: "button", type: "button" }, [
    "New Game",
  ]);
  newGameButton.addEventListener("click", onNewGame);

  const highScoresButton = createEl({ tag: "button", type: "button" }, [
    "High Scores",
  ]);
  highScoresButton.addEventListener("click", onShowHighScores);

  const input = createEl({
    tag: "input",
    type: "text",
    id: "guess",
    name: "guess",
    className: "guess-input",
    maxlength: length,
    autocomplete: "off",
    autocapitalize: "off",
    spellcheck: "false",
    "aria-describedby": "hint",
    disabled: finished,
  });
  const okButton = createEl({ tag: "button", type: "submit", disabled: true }, [
    "OK",
  ]);
  const hint = createEl({ tag: "p", id: "hint", className: "muted" }, [
    finished ? "" : defaultHint,
  ]);

  const form = createEl({ tag: "form", className: "input-row" }, [
    createEl({ tag: "label", for: "guess" }, ["Input:"]),
    input,
    okButton,
  ]);

  input.addEventListener("input", () => {
    const cleaned = [...input.value]
      .filter(isDigit)
      .join("")
      .toLowerCase()
      .slice(0, length);
    if (cleaned !== input.value) {
      input.value = cleaned;
    }
    okButton.disabled = !isValidGuess(cleaned, length, base);
    hint.textContent = defaultHint;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!isValidGuess(input.value, length, base)) {
      return;
    }
    if (!onGuess(input.value)) {
      hint.textContent = "You have already tried this number.";
      input.select();
    }
  });

  const history = createTable(
    ["#", "Guess", "Bulls", "Cows"],
    round.history.map(({ guess, bulls, cows }, index) => [
      index + 1,
      guess,
      bulls,
      cows,
    ]),
    { className: "history" },
  );

  const attempts = round.history.length;
  const status = createEl({ tag: "p", className: "status", role: "status" }, [
    createEl({ tag: "span" }, [
      finished ? "You win! :)" : `Attempts: ${attempts}`,
    ]),
    createEl({ tag: "span" }, [
      finished
        ? `Attempts: ${attempts} · Used ${formatSeconds(elapsedMs(round, Date.now()))}`
        : "",
    ]),
  ]);

  return createEl({ tag: "main", className: "screen" }, [
    createEl({ tag: "header", className: "toolbar" }, [
      createEl({ className: "toolbar-actions" }, [
        newGameButton,
        highScoresButton,
      ]),
      createEl({ tag: "span", className: "muted" }, [
        `${length} digits · ${baseName(base)}`,
      ]),
    ]),
    form,
    hint,
    history,
    status,
  ]);
}
