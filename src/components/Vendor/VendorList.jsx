import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TuneIcon from "@mui/icons-material/Tune";
import PrintIcon from "@mui/icons-material/Print";
import html2pdf from "html2pdf.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import {
  deleteVendorByIDAction,
  getVendorDataAction,
} from "../../Actions/vendorActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const VendorList = () => {
  const dispatch = useDispatch();
  const { vendors, loading } = useSelector((state) => state.vendors);
  const [open, setOpen] = useState(true);
  const [contentopen, setcontentOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    dispatch(getVendorDataAction());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteVendorByIDAction(id));
    dispatch(getVendorDataAction());
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id, rowData) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.some((row) => row.id === id)) {
        // If the ID is already in the selectedRows, remove it
        return prevSelectedRows.filter((row) => row.id !== id);
      } else {
        // If the ID is not in selectedRows, add the entire row data
        return [...prevSelectedRows, rowData];
      }
    });
  };

  const downloadCsv = async () => {
    const headers = [
      "Sr No.",
      "Name Of The Company",
      "Contact Person",
      "Mobile No",
    ];
    // console.log(headers);
    let csvContent = headers.join(",") + "\n";

    let x = 1;
    selectedRows.forEach((header) => {
      const values = [
        `${x}`,
        header.companyName,
        header.contactPerson,
        header.mobileNumber,
      ];

      console.log(values);
      csvContent += values.join(",") + "\n";
      x = x + 1;
    });
    // console.log(selectedRows);
    // await setCsvOutput(csvContent);

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    csvContent = [];
  };

  const handleClick = () => {
    console.log(selectedRows);

    const tableRows = selectedRows.map(
      (item, index) =>
        `<tr key=${item._id}>
        <td>${index + 1}</td>
        <td>${item.companyName}</td>
        <td>${item.contactPerson}</td>
        <td>${item.mobileNumber}</td>
      </tr>`
    );

    const tableContent = `
      <html>
        <head>
        <img src="https://hips.hearstapps.com/hmg-prod/images/dwayne-the-rock-johnson-gettyimages-1061959920.jpg"/>
    <p>Harsh</p>
          <title>Print Table</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>JSON Data in Table Format</h1>
          <table>
            <thead>
              <tr>
                <th>SR.No</th>
                <th>Name of the Company</th>
                <th>Contact Person Name</th>
                <th>Mobile No</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=800,height=800"); // Increase width and height
    if (printWindow) {
      printWindow.document.write(tableContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert("Please allow pop-ups for this website");
    }
  };
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows((prevSelectedRows) => {
      if (!selectAll) {
        return vendors;
      } else {
        return [];
      }
    });
  };

  const filters = [
    {
      id: 1,
      name: "Types of Inventory",
      options: [
        { value: "Consumable", label: "Consumable" },
        { value: "Non-Consumable", label: "Non-Consumable" },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "Electronic", label: "Electronic" },
        { value: "Furniture", label: "furniture" },
        { value: "Furniture", label: "Furniture" },
        { value: "Food", label: "Food" },
      ],
    },
    {
      id: "Inventory",
      name: "Inventory",
      options: [
        { value: "Pen", label: "Pen" },
        { value: "Marker", label: "Marker" },
        { value: "Stapler", label: "Stapler" },
        { value: "Punch Machine", label: "Punch Machine" },
        { value: "Display Board", label: "Display Board" },
      ],
    },
  ];

  const toggleFilter = () => {
    setOpen(!open);
  };

  const handleSelect = (selectedValue) => {
    setSelectedOption("Export As");
    if (selectedValue === "csv") {
      downloadCsv();
    } else if (selectedValue === "pdf") {
      downloadPdf();
    }
  };

  const downloadPdf = () => {
    const tableRows = selectedRows.map(
      (item, index) =>
        `<tr key=${item._id}>
        <td>${index + 1}</td>
        <td>${item.companyName}</td>
        <td>${item.contactPerson}</td>
        <td>${item.mobileNumber}</td>
      </tr>`
    );

    const tableContent = `
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Vendor List</h1>
          <br/>
          <table>
            <thead>
              <tr>
                <th>SR.No</th>
                <th>Name of the Company</th>
                <th>Contact Person Name</th>
                <th>Mobile No</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const pdfOptions = {
      margin: 4,
      filename: "tableData.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(tableContent).set(pdfOptions).save();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div>
              {" "}
              {/* top bar inward */}
              <div>
                <div className="text-[24px]">Vendor List</div>
                <div className="flex">
                  <Link
                    to="/home"
                    className="font-medium text-[#5C59E8] mr-3 hover:underline flex items-center"
                  >
                    Dashboard
                  </Link>
                  <p className="font-medium text-2xl text-[#A3A9B6] mr-3">
                    {" "}
                    <ArrowForwardIosIcon />{" "}
                  </p>
                  <p className="flex items-center text-base text-[#667085]">
                    Vendor
                  </p>
                  <p className="font-medium text-2xl text-[#A3A9B6] mr-3">
                    {" "}
                    <ArrowForwardIosIcon />{" "}
                  </p>
                  <p className="flex items-center text-base text-[#667085]">
                    Vendor List
                  </p>
                </div>
              </div>
              <div className="mt-4 md:flex justify-center md:justify-center">
                <div className="mt-3 md:mt-0 md:flex">
                  <button
                    className="p-2 mx-2 px-3 pr-26  rounded-lg bg-[#5C59E8] text-md text-white mr-4 "
                    onClick={handleClick}
                  >
                    <PrintIcon />
                  </button>
                  <select
                    className="p-2 mx-2 px-6 pr-26 rounded-lg bg-[#5C59E8] text-md text-white mr-4"
                    onChange={(e) => handleSelect(e.target.value)}
                    value={selectedOption}
                  >
                    <option value="Export AS">Export As</option>
                    <option value="csv">Save as CSV</option>
                    <option value="pdf">Save as Pdf</option>
                  </select>
                  <button
                    onClick={toggleFilter}
                    href="#"
                    className="md:mr-6 mr-3 md:w-40 md:ml-0 w-2/5 ml-6 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-[#667085] bg-white border-t border-b border-gray-200 rounded-l-lg rounded-r-lg hover:bg-gray-100 hover:text-[#5C59E8] focus:z-10 focus:ring-2 focus:ring-[#5C59E8] focus:text-[#5C59E8] "
                  >
                    <TuneIcon /> Filters
                  </button>

                  <div className="p-0">
                    {!open && (
                      <div>
                        <div className="p-2 border w-[250px] z-50 absolute  border-stone-400  drop-shadow-xl bg-white rounded-lg ">
                          <p className="font-bold  text-lg">Filters</p>

                          <div>
                            {filters.map((filter) => (
                              <div key={filter.id}>
                                <div className=" bg-[#F0F1F3] rounded-lg">
                                  {" "}
                                  <button
                                    onClick={() => setcontentOpen(!contentopen)}
                                    className=" bg-[#F9F9FC]] "
                                  >
                                    <h2 className=" font-medium p-1  bg-[#F0F1F3]">
                                      {filter.name}
                                    </h2>
                                  </button>{" "}
                                </div>
                                <ul>
                                  {contentopen &&
                                    filter.options.map((option) => (
                                      <li
                                        className="p-2 text-[#667085]"
                                        key={option.value}
                                      >
                                        <label className="">
                                          <input
                                            type="checkbox"
                                            value={option.value}
                                          />
                                          <a className="p-1">{option.label}</a>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end">
                            <button
                              className=" p-2 border-2 rounded-lg m-2 border-gray-500"
                              onClick={toggleFilter}
                            >
                              Cancel
                            </button>
                            <button
                              className=" p-2 border-2 rounded-lg m-2 border-gray-500 bg-slate-500 text-white"
                              onClick={toggleFilter}
                            >
                              Apply Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="block bg-transparent m-4 p-4 overflow-x-auto w-full ">
                <table className="w-full shadow-md  border-2 rounded-2xl">
                  <thead className="w-full">
                    <tr className="border border-solid">
                      <th className="text-md px-6 py-3">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={() => handleSelectAll()}
                        />
                      </th>
                      <th className="text-md px-6 py-3">Sr.No</th>
                      <th className="text-md px-6 py-3">Name of the Company</th>
                      <th className="text-md px-6 py-3">Contact Person Name</th>
                      <th className="text-md px-6 py-3">Mobile No</th>
                      <th className="text-md px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {vendors?.map((vendor, index) => (
                      <tr key={vendor?._id}>
                        <td className="text-md border-b text-center px-6  py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.some(
                              (selectedRow) => selectedRow._id === vendor?._id
                            )}
                            onChange={() =>
                              handleCheckboxChange(vendor?._id, vendor)
                            }
                          />
                        </td>
                        <th className="text-md text-center border-b px-6 py-3 text-[#5C59E8]">
                          <Link to={`/order-details-page/${vendor._id}`}>
                            {index + 1}
                          </Link>
                        </th>
                        <td className="text-md text-center px-6  py-3 border-b">
                          {vendor?.companyName}
                        </td>

                        <td className="text-md  border-b text-center px-6 py-3">
                          {vendor?.contactPerson}
                        </td>
                        <td className="text-md  border-b text-center px-6 py-3">
                          {vendor?.mobileNumber}
                        </td>
                        <td className="text-md px-5 py-3    bg-white border-b">
                          <div className="flex justify-around">
                            <button
                              // onClick={() => handleEdit(order)}
                              className="rounded-full p-2 border-slate-900 "
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDelete(vendor?._id)}
                              className="rounded-full p-2   bg-red"
                            >
                              <DeleteIcon />
                            </button>
                            <button
                              //  onClick={() => handleDelete(products?._id)}
                              className="rounded-full  bg-red"
                            >
                              <VisibilityIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VendorList;
