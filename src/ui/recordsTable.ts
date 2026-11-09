import type { RecordEntry } from "../game/records.ts";
import createEl from "../utilities/createEl.ts";
import { formatSeconds } from "./format.ts";
import createTable from "../utilities/createTable.ts";

export default function renderRecords(
  records: readonly RecordEntry[],
  title: string,
  highlightFinishedAt: number | null = null,
) {
  const content =
    records.length === 0
      ? createEl({ tag: "p", className: "muted" }, ["No results yet."])
      : createTable(
          ["#", "Attempts", "Time"],
          records.map((record, index) => [
            index + 1,
            record.attempts,
            formatSeconds(record.timeMs),
          ]),
          {
            highlightRow: records.findIndex(
              (record) => record.finishedAt === highlightFinishedAt,
            ),
          },
        );

  return createEl({ tag: "section", className: "records" }, [
    createEl({ tag: "h2" }, [title]),
    content,
  ]);
}
