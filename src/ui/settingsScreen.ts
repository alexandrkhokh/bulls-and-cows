import countPossibleSecrets from "../functions/countPossibleSecrets.ts";
import {
  changeBase,
  changeLength,
  isRadix,
  maxLength,
  MIN_LENGTH,
  RADIX_OPTIONS,
  type Settings,
} from "../game/settings.ts";
import createEl from "../utilities/createEl.ts";

type Props = {
  settings: Settings;
  onChange: (settings: Settings) => void;
  onStart: () => void;
  onShowHighScores: () => void;
};

export default function renderSettingsScreen({
  settings,
  onChange,
  onStart,
  onShowHighScores,
}: Props) {
  const baseSelect = createEl(
    { tag: "select", id: "base", name: "base" },
    RADIX_OPTIONS.map(([name, value]) =>
      createEl({ tag: "option", value, selected: value === settings.base }, [
        `${name} (${value})`,
      ]),
    ),
  );

  const max = maxLength(settings.base);
  const lengthRange = createEl({
    tag: "input",
    type: "range",
    id: "length",
    name: "length",
    min: MIN_LENGTH,
    max,
    step: 1,
    value: settings.length,
    // For bin the only possible length is 2 (= base): nothing to choose.
    disabled: max <= MIN_LENGTH,
  });
  const lengthOutput = createEl({ tag: "output", for: "length" }, [
    String(settings.length),
  ]);
  const possibleSecrets = createEl({ tag: "p", className: "muted" });
  const showPossibleSecrets = (length: number) => {
    possibleSecrets.textContent = `Possible secrets: ${countPossibleSecrets(length, settings.base).toLocaleString("en-US")}`;
  };
  showPossibleSecrets(settings.length);

  baseSelect.addEventListener("change", () => {
    const base = Number(baseSelect.value);
    if (isRadix(base)) {
      onChange(changeBase(settings, base));
    }
  });

  // While dragging, only the readout follows; the state is updated on release.
  lengthRange.addEventListener("input", () => {
    lengthOutput.textContent = lengthRange.value;
    showPossibleSecrets(Number(lengthRange.value));
  });

  lengthRange.addEventListener("change", () => {
    onChange(changeLength(settings, Number(lengthRange.value)));
  });

  const startButton = createEl(
    { tag: "button", type: "button", className: "primary" },
    ["Start"],
  );
  startButton.addEventListener("click", onStart);

  const highScoresButton = createEl({ tag: "button", type: "button" }, [
    "High Scores",
  ]);
  highScoresButton.addEventListener("click", onShowHighScores);

  const field = (id: string, label: string, ...controls: HTMLElement[]) =>
    createEl({ className: "field" }, [
      createEl({ tag: "label", for: id }, [label]),
      ...controls,
    ]);

  return createEl({ tag: "main", className: "screen" }, [
    createEl({ tag: "h1" }, ["Bulls and Cows"]),
    field("base", "Number system", baseSelect),
    field("length", "Digits", lengthRange, lengthOutput),
    possibleSecrets,
    startButton,
    highScoresButton,
  ]);
}
