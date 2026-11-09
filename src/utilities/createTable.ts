import createEl from "./createEl.ts";

type Cell = string | number;

type TableOptions = {
  className?: string;
  highlightRow?: number;
};

export default function createTable(
  headers: readonly string[],
  rows: readonly (readonly Cell[])[],
  { className, highlightRow = -1 }: TableOptions = {},
) {
  const head = createEl({ tag: "thead" }, [
    createEl(
      { tag: "tr" },
      headers.map((header) => createEl({ tag: "th", scope: "col" }, [header])),
    ),
  ]);

  const body = createEl(
    { tag: "tbody" },
    rows.map((cells, index) =>
      createEl(
        { tag: "tr", className: index === highlightRow ? "highlight" : "" },
        cells.map((cell) => createEl({ tag: "td" }, [String(cell)])),
      ),
    ),
  );

  return createEl({ tag: "table", className }, [head, body]);
}
