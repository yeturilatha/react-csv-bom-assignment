import Papa from "papaparse";

function UploadPage({ onDataLoaded }) {
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onDataLoaded(results.data);
      },
    });
  }

  return (
    <div className="upload-box">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <p className="hint">Upload a CSV file with supplier rates</p>
    </div>
  );
}

export default UploadPage;
