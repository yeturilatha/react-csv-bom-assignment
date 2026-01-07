import { getHeatmapColor } from "../utils/heatmap";
import { getPercentageDiff } from "../utils/percentage";
import { useSorting } from "../hooks/useSorting";
import { useColumnVisibility } from "../hooks/useColumnVisibility";
import { useFreezeColumns } from "../hooks/useFreezeColumns";
import "./TablePage.css";

function TablePage({ data }) {
  // ✅ Hooks MUST be called unconditionally
  const columns = data?.length ? Object.keys(data[0]) : [];

  const supplierColumns = columns.filter((c) =>
    c.toLowerCase().includes("supplier")
  );

  const { sortedData, sortConfig, requestSort } = useSorting(data || []);
  const { visibleColumns, toggleColumn, hiddenColumns } =
    useColumnVisibility(columns);
  const { freezeUpto, setFreezeUpto, getCellStyle } =
    useFreezeColumns();

  if (!data || data.length === 0) {
    return <p>No CSV data available</p>;
  }

  return (
    <div className="table-wrapper">
      {/* <h2 className="title">CSV Data Table</h2> */}

      {/* ===== Column Toggle ===== */}
      <div className="controls">
        <strong>Columns:</strong>
        {columns.map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={!hiddenColumns.includes(col)}
              onChange={() => toggleColumn(col)}
            />
            {col}
          </label>
        ))}
      </div>

      {/* ===== Freeze Column ===== */}
      <div className="controls">
        <strong>Freeze upto:</strong>
        <select
          value={freezeUpto ?? ""}
          onChange={(e) =>
            setFreezeUpto(
              e.target.value === "" ? null : Number(e.target.value)
            )
          }
        >
          <option value="">None</option>
          {visibleColumns.map((col, i) => (
            <option key={col} value={i}>
              {col}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Table ===== */}
      <div className="table-container">
        <table className="csv-table">
          <thead>
            <tr>
              {visibleColumns.map((col, i) => (
                <th
                  key={col}
                  onClick={() => requestSort(col)}
                  style={getCellStyle(i)}
                >
                  {col}
                  {sortConfig?.column === col &&
                    (sortConfig.direction === "asc"
                      ? " ▲"
                      : " ▼")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedData.map((row, rIdx) => {
              const supplierValues = supplierColumns.map((c) =>
                Number(row[c])
              );
              const min = Math.min(...supplierValues);
              const max = Math.max(...supplierValues);

              return (
                <tr key={rIdx}>
                  {visibleColumns.map((col, cIdx) => {
                    const isSupplier =
                      supplierColumns.includes(col);
                    const value = Number(row[col]);

                    return (
                      <td
                        key={col}
                        style={{
                          ...(isSupplier && {
                            backgroundColor: getHeatmapColor(
                              value,
                              min,
                              max
                            ),
                          }),
                          ...getCellStyle(cIdx),
                        }}
                      >
                        <div className="cell-content">
                          <div className="cell-value">
                            {row[col]}
                          </div>

                          {isSupplier && (
                            <div className="cell-percent">
                              {getPercentageDiff(
                                value,
                                Number(row["Estimated Rate"])
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablePage;
