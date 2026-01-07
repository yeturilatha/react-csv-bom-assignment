import { useState } from "react";
import Table from "../pages/TablePage";
import "./CSVPage.css";

export default function CSVPage() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((r) => r.split(","));
      const headers = rows[0];

      const parsed = rows.slice(1).filter(Boolean).map((row) => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h.trim()] = row[i]?.trim();
        });
        return obj;
      });

      setData(parsed);
    };

    reader.readAsText(file);
  };

  return (
    <div className="csv-page">
      <h2>CSV Data Table</h2>

      {data.length === 0 && (
        <div className="upload-card">
          <p className="upload-title">Upload CSV File</p>

          <label className="upload-button">
            Choose CSV File
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileUpload}
            />
          </label>

          <p className="upload-hint">
            File should contain Item, Quantity, Estimated Rate & Supplier prices
          </p>
        </div>
      )}

      {data.length > 0 && <Table data={data} />}
    </div>
  );
}
