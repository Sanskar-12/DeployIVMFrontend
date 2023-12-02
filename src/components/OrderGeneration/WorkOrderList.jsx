import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import axios from "axios";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  deleteWorkOrderDataAction,
  getAllWorkOrderDataAction,
} from "../../Actions/workOrderActions";

const WorkOrderList = () => {
  const dispatch = useDispatch();
  const { getworkOrderdata: workOrderdata, loading } = useSelector(
    (state) => state.workOrders
  );

  useEffect(() => {
    dispatch(getAllWorkOrderDataAction());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteWorkOrderDataAction(id));
    dispatch(getAllWorkOrderDataAction());
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [getworkOrderdata, setGetworkOrderdata] = useState(null);
  const [viewPdf, setViewPdf] = useState();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [open, setOpen] = useState(true);
  const [contentopen, setcontentOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleCheckboxChange = (id, rowData) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.some((row) => row.id === id)) {
        return prevSelectedRows.filter((row) => row.id !== id);
      } else {
        return [...prevSelectedRows, rowData];
      }
    });
  };

  const downloadCsv = async () => {
    const headers = ["Order Id", "Subject", "Order Type", "Total"];
    // console.log(headers);
    let csvContent = headers.join(",") + "\n";

    selectedRows.forEach((header) => {
      const values = [
        header._id,
        header._id.substring(0, 6),
        header.general_Information.subject,
        header.general_Information.to,
        header.table_Data[header?.table_Data?.length - 1][
          Object.keys(header.table_Data[0]).pop()
        ],
      ];

      console.log(values);
      csvContent += values.join(",") + "\n";
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
      (item) =>
        `<tr key=${item._id}>
        <td>${item?._id.substring(0, 6)}</td>
        <td>${item?.general_Information?.subject}</td>
        <td>Work Order</td>
        <td>${
          item.table_Data[item?.table_Data?.length - 1][
            Object.keys(item.table_Data[0]).pop()
          ]
        }</td>
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
                <th>Order Id</th>
                <th>Subject</th>
                <th>Order Type</th>
                <th>Total</th>
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
        return workOrderdata;
      } else {
        return [];
      }
    });
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    pdf.setProperties({
      title: "Your PDF Title",
      subject: getworkOrderdata?.general_Information?.subject,
      author: "Your Name",
    });

    pdf.text(20, 20, "General Information:");
    pdf.text(
      20,
      30,
      `Reference Number: ${getworkOrderdata?.general_Information?.reference_number}`
    );
    pdf.text(
      20,
      40,
      `Subject: ${getworkOrderdata?.general_Information?.subject}`
    );
    pdf.text(
      20,
      50,
      `Letter: ${getworkOrderdata?.general_Information?.letter}`
    );

    pdf.text(20, 60, "Terms and Conditions: ");
    pdf.text(
      20,
      70,
      `Current Total Amount: ${getworkOrderdata?.taxation_Details?.current_total_amount}`
    );
    pdf.text(
      20,
      80,
      `Discount: ${getworkOrderdata?.taxation_Details?.discount}`
    );
    pdf.text(
      20,
      90,
      `Total After Discount: ${getworkOrderdata?.taxation_Details.total_after_discount}`
    );
    pdf.text(20, 100, `Cgst: ${getworkOrderdata?.taxation_Details?.cgst}`);
    pdf.text(20, 110, `Scgst: ${getworkOrderdata?.taxation_Details?.scgst}`);
    pdf.text(
      20,
      120,
      `Final Total Amount: ${getworkOrderdata?.taxation_Details.final_total_amount}`
    );
    pdf.text(20, 150, "Table Data:");
    const columns = Object.keys(getworkOrderdata?.table_Data[0]);

    const rows = getworkOrderdata?.table_Data.map((row) =>
      columns.map((column) => (row[column] !== undefined ? row[column] : ""))
    );

    pdf.autoTable({
      startY: 160,
      head: [columns],
      body: rows,
    });

    const generatedPdf = pdf.output("datauristring");

    if (generatedPdf) {
      setViewPdf((prevViewPdf) => {
        if (prevViewPdf !== generatedPdf) {
          return generatedPdf;
        }
        return prevViewPdf;
      });
    } else {
      console.error("Error generating PDF");
    }
  };

  const handlePreview = (id) => {
    const fetchData = async () => {
      await axios
        .get(`/api/v1/get/workorder/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data.workOrderdata;
          setGetworkOrderdata(data);
          if (getworkOrderdata) {
            generatePDF();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    onOpen();
  };
  useEffect(() => {
    if (getworkOrderdata) {
      generatePDF();
    }
  }, [getworkOrderdata]);

  const onCloseHandler = () => {
    onClose();
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
      (item) =>
        `<tr key=${item._id}>
        <td>${item?._id.substring(0, 6)}</td>
        <td>${item?.general_Information?.subject}</td>
        <td>Work Order</td>
        <td>${
          item.table_Data[item?.table_Data?.length - 1][
            Object.keys(item.table_Data[0]).pop()
          ]
        }</td>
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
          <h1>Work Order List</h1>
          <br/>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Subject</th>
                <th>Order Type</th>
                <th>Total</th>
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
      margin: 10,
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
                <div className="text-[24px]">Work Order List</div>
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
                    Order Generation
                  </p>
                  <p className="font-medium text-2xl text-[#A3A9B6] mr-3">
                    {" "}
                    <ArrowForwardIosIcon />{" "}
                  </p>
                  <p className="flex items-center text-base text-[#667085]">
                    Work Order List
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
                      <th className="text-md px-6 py-3">Order Id</th>
                      <th className="text-md px-6 py-3">Subject</th>
                      <th className="text-md px-6 py-3">Order Type</th>
                      <th className="text-md px-6 py-3">Total</th>
                      <th className="text-md px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {workOrderdata?.map((order) => (
                      <tr key={order?._id}>
                        <td className="text-md border-b text-center px-6  py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.some(
                              (selectedRow) => selectedRow._id === order?._id
                            )}
                            onChange={() =>
                              handleCheckboxChange(order?._id, order)
                            }
                          />
                        </td>
                        <th className="text-md text-center border-b px-6 py-3 text-[#5C59E8]">
                          <Link to={`/order-details-page/${order._id}`}>
                            {order?._id.substring(0, 6)}
                          </Link>
                        </th>
                        <td className="text-md text-center px-6  py-3 border-b">
                          {order?.general_Information?.subject}
                        </td>

                        <td className="text-md  border-b text-center px-6 py-3">
                          Work Order
                          {/* <div className="justify-center  text-sm opacity-40">
                            {order?.general_Information?.to}
                          </div> */}
                        </td>
                        <td className="text-md  border-b text-center px-6 py-3">
                          {
                            order?.table_Data[order?.table_Data?.length - 1][
                              Object.keys(order.table_Data[0]).pop()
                            ]
                          }
                        </td>
                        <td className="text-md px-5 py-3    bg-white border-b">
                          <div className="flex justify-around">
                            <button
                              //   onClick={() =>
                              //     handleEdit("655b57911eb55ce157c925f5")
                              //   }
                              className="rounded-full p-2 border-slate-900 "
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDelete(order?._id)}
                              className="rounded-full p-2   bg-red"
                            >
                              <DeleteIcon />
                            </button>
                            <button
                              onClick={() => handlePreview(order?._id)}
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

            <Modal isOpen={isOpen} onClose={onClose} size="full">
              <ModalOverlay backdropFilter={"blur(10px)"} />
              <ModalContent>
                <ModalHeader>Preview of Purchase Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Container>
                    {viewPdf && (
                      <Worker
                        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
                      >
                        <Viewer fileUrl={viewPdf} />
                      </Worker>
                    )}
                  </Container>
                </ModalBody>
                <ModalFooter>
                  <Button mr={"3"} onClick={onCloseHandler}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

export default WorkOrderList;
