import { loadAllLeaderboards } from "../game/recordsStorage.ts";
import { baseName, type Settings } from "../game/settings.ts";
import createEl from "../utilities/createEl.ts";
import createModal from "../utilities/Modal.ts";
import renderRecords from "./recordsTable.ts";

const isSameSettings = (a: Settings, b: Settings) =>
  a.length === b.length && a.base === b.base;

export default function showHighScores(
  current: Settings,
  highlightFinishedAt: number | null = null,
) {
  const leaderboards = loadAllLeaderboards().toSorted(
    (a, b) =>
      Number(isSameSettings(b.settings, current)) -
      Number(isSameSettings(a.settings, current)),
  );

  const sections = leaderboards.map(({ settings, records }) =>
    renderRecords(
      records,
      `${settings.length} digits, ${baseName(settings.base)}`,
      highlightFinishedAt,
    ),
  );

  createModal(
    createEl({ className: "high-scores" }, [
      createEl({ tag: "h1" }, ["High Scores"]),
      ...(sections.length > 0
        ? sections
        : [createEl({ tag: "p", className: "muted" }, ["No results yet."])]),
    ]),
  );
}
