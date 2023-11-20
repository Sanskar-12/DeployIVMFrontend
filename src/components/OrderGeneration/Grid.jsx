import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
function generateRandomData(rows, columns) {
  const data = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      // Generate random data (for example, random numbers)
      // console.log(row);
      row.push("Add data");
    }
    data.push(row);
  }
  // console.log(data);
  return data;
}

function Grid({ refNo, to, subject, letter, payment, warranty, delievery }) {
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [tableData, setTableData] = useState([
    generateRandomData(rows, columns),
  ]);
  const [data, setData] = useState([]);
  const [biData, setbiData] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);
  const [ur, setUr] = useState("");
  const regenerateData = () => {
    setTableData(generateRandomData(rows, columns));
    setData(tableData);
  };

  const addRow = () => {
    const newRow = Array(columns).fill("Add data");
    setTableData([...tableData, newRow]);
    setRows(rows + 1);
    setData(tableData);
  };

  const addColumn = () => {
    const newTableData = tableData.map((row) => [...row, "Add data"]);
    setTableData(newTableData);
    setColumns(columns + 1);
    setData(tableData);
  };

  const removeRow = () => {
    if (rows > 1) {
      const newTableData = tableData.slice(0, -1);
      setTableData(newTableData);
      setRows(rows - 1);
      setData(tableData);
    }
  };

  const removeColumn = () => {
    if (columns > 1) {
      const newTableData = tableData.map((row) => row.slice(0, -1));
      setTableData(newTableData);
      setColumns(columns - 1);
      setData(tableData);
    }
  };

  const handleCellChange = (rowIndex, colIndex, newValue) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = newValue;
    setTableData(newTableData);
    setData(tableData);
  };

  const tableStyle = {
    borderCollapse: "collapse",
  };

  const cellStyle = {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "center",
  };
  const handleSubmit = () => {
    // Step 1: Generate the PDF and fetch it
    let newData={refNo, to, subject, letter, payment, warranty, delievery}
    newData={...newData,data}
console.log(newData);
    axios
      .post("/api/v1/create-pdf", newData)
      .then((want) => {
        // Assuming that the server returns the `pdfId` in the response
        // Step 2: Fetch the PDF by ID
        console.log(want);
        const pid = want.data.pdf._id;
        setbiData(want.data.pdf.pdfData.data);
        return axios.get(`/api/v1/fetch-pdf/${pid}`, { responseType: "blob" });
      })
      .then((response) => {
        if (response.status === 200) {
          const pdfBlob = new Blob([response.data], {
            type: "application/pdf",
          });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setUr(pdfUrl);
          saveAs(pdfUrl, "generatedDocument.pdf");
        } else {
          console.error("Failed to download the PDF");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleLoadPDF = () => {
    // Convert the binary data to a data URL

    const url = ur;

    setPdfDataUrl(url);
  };

  return (
    <div>
      <button onClick={regenerateData}>Generate Random Data</button>
      <button onClick={addRow}>Add Row (+)</button>
      <button onClick={addColumn}>Add Column (+)</button>
      <button onClick={removeRow}>Remove Row (-)</button>
      <button onClick={removeColumn}>Remove Column (-)</button>
      <table style={tableStyle}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={cellStyle}
                  contentEditable={true}
                  onBlur={(e) =>
                    handleCellChange(rowIndex, colIndex, e.target.textContent)
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <button onClick={handleLoadPDF}>Load PDF</button>
        {pdfDataUrl && (
          <div>
            <Document file={pdfDataUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Grid;
