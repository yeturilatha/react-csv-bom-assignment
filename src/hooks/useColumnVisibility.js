import { useState } from "react";

export function useColumnVisibility(columns) {
  const [hiddenColumns, setHiddenColumns] = useState([]);

  function toggleColumn(column) {
    setHiddenColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  }

  const visibleColumns = columns.filter(
    (c) => !hiddenColumns.includes(c)
  );

  return { hiddenColumns, visibleColumns, toggleColumn };
}
