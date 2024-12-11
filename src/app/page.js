"use client";

import React from "react";

export default function Home() {
  const [jsonData, setJsonData] = React.useState([]); // State to store JSON data
  const [csvData, setCsvData] = React.useState(""); // State to store CSV data
  const [covertedJsonData, setConvertedJsonData] = React.useState(); // State to store JSON data

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setJsonData(json);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  };

  // Recursive function to flatten nested keys
  const flattenKeys = (obj, parentKey = "") => {
    let result = {};
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        result = {
          ...result,
          ...flattenKeys(obj[key], `${parentKey}${parentKey ? "." : ""}${key}`),
        };
      } else {
        result[`${parentKey}${parentKey ? "." : ""}${key}`] = obj[key];
      }
    }
    return result;
  };

  // Function to convert JSON to CSV
  const convertToCsv = () => {
    let csv = "KEY,EN,FI\n"; // Initialize CSV with header row

    // Flatten keys of 'en' and 'fi' objects
    const flattenedEn = flattenKeys(jsonData.en);
    const flattenedFi = flattenKeys(jsonData.fi);

    // Get all unique keys
    const keys = Object.keys({ ...flattenedEn, ...flattenedFi });

    // Iterate over each key
    keys.forEach((key) => {
      // Extract 'EN' and 'FI' values
      const enValue = flattenedEn[key] || "";
      const fiValue = flattenedFi[key] || "";

      // Append 'KEY', 'EN', and 'FI' rows to CSV
      csv += `"${key}","${enValue}","${fiValue}"\n`;
    });

    // Set the CSV data state
    setCsvData(csv);
  };

  // ##### CSV to JSON
  const handleCSVFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        setCsvData(csv);
      } catch (error) {
        console.error("Error reading CSV file:", error);
      }
    };
    reader.readAsText(file);
  };

  // Function to convert CSV to JSON
  const convertToJSON = () => {
    if (typeof csvData !== "string" || !csvData.trim()) {
      console.error("CSV data is not valid.");
      return {};
    }

    const rows = csvData.split("\n");
    const jsonData = {
      en: {},
      fi: {},
    };

    for (let i = 1; i < rows.length; i++) {
      const values = parseCSVRow(rows[i]);

      const key = values[0];
      const enValue = values[1];
      const fiValue = values[2];

      const nestedKeys = key.split(".");

      if (nestedKeys.length === 1) {
        jsonData.en[key] = enValue;
        jsonData.fi[key] = fiValue;
      } else {
        let currentEnObj = jsonData.en;
        let currentFiObj = jsonData.fi;
        for (let j = 0; j < nestedKeys.length - 1; j++) {
          const currentKey = nestedKeys[j];
          currentEnObj[currentKey] = currentEnObj[currentKey] || {};
          currentEnObj = currentEnObj[currentKey];
          currentFiObj[currentKey] = currentFiObj[currentKey] || {};
          currentFiObj = currentFiObj[currentKey];
        }
        currentEnObj[nestedKeys[nestedKeys.length - 1]] = enValue;
        currentFiObj[nestedKeys[nestedKeys.length - 1]] = fiValue;
      }
    }

    setConvertedJsonData(jsonData);
  };

  // Function to parse CSV row while handling quoted values
  const parseCSVRow = (row) => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        if (!inQuotes) {
          // Entering quoted section
          inQuotes = true;
        } else if (row[i + 1] === '"') {
          // Escaped quotation mark
          current += '"';
          i++; // Skip the next character
        } else {
          // Exiting quoted section
          inQuotes = false;
        }
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  };

  const downloadJSON = () => {
    const jsonData = covertedJsonData;
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to copy JSON to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(covertedJsonData, null, 2))
      .then(() => {
        alert("JSON copied to clipboard successfully");
      })
      .catch((error) => {
        console.error("Error copying JSON to clipboard:", error);
      });
  };

  return (
    <main className="grid grid-cols-2 min-h-screen flex-col gap-24 p-24">
      <section className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">JSON to CSV Converter</h1>
        <input type="file" onChange={handleFileChange} accept=".json" />
        <button className="p-2 bg-slate-600 text-white rounded" onClick={convertToCsv}>
          Convert to CSV
        </button>
        {csvData && (
          <div className="flex flex-col gap-3">
            <h2>CSV Output:</h2>
            <textarea value={csvData} rows={20} cols={50} readOnly />
            <a
              className="d-block text-center p-2 border border-slate-600 text-slate-600 rounded"
              href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
              download="output.csv"
            >
              Download CSV
            </a>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">CSV to JSON Converter</h1>
        <input type="file" onChange={handleCSVFileChange} accept=".csv" />
        <button className="p-2 bg-slate-600 text-white rounded" onClick={convertToJSON}>
          Convert to JSON
        </button>

        {covertedJsonData && (
          <div className="flex flex-col gap-3">
            <h2>
              JSON Output:{" "}
              <button className=" bg-stone-800 text-white p-2 rounded " onClick={copyToClipboard}>
                Copy to Clipboard
              </button>{" "}
            </h2>
            <code className="max-h-[500px] overflow-auto">
              <pre>{JSON.stringify(covertedJsonData, null, 2)}</pre>
            </code>
            <button className="p-2 border border-slate-600 text-slate-600 rounded" onClick={downloadJSON}>
              Download JSON
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
