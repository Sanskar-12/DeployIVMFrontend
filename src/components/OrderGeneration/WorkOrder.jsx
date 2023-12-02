import {  useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm } from "react-hook-form";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  createWorkOrderAction,
} from "../../Actions/workOrderActions";
import "@react-pdf-viewer/core/lib/styles/index.css";

function generateTable(rows, columns) {
  const data = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push("Add data");
    }
    data.push(row);
  }
  return data;
}

const WorkOrder = () => {

  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(2); // Set initial columns to 2
  const [tableData, setTableData] = useState([["SR.NO", "Total"]]);
  const addRow = (e) => {
    e.preventDefault();
    const newRow = Array(columns).fill("Add data");
    setTableData([...tableData.slice(0, 1), newRow, ...tableData.slice(1)]);
    setRows(rows + 1);
  };

  const addColumn = (e) => {
    e.preventDefault();
    const newTableData = tableData.map((row, rowIndex) => {
      if (rowIndex === 0) {
        // If it's the first row, keep "SR.NO" intact
        return ["SR.NO", "Add data", ...row.slice(1)];
      } else {
        // For other rows, add "Add data"
        return [...row, "Add data"];
      }
    });
    setTableData(newTableData);
    setColumns(columns + 1);
  };

  const removeRow = (e) => {
    e.preventDefault();
    if (rows > 1) {
      const newTableData = tableData.slice(0, -1);
      setTableData(newTableData);
      setRows(rows - 1);
    }
  };

  const removeColumn = (e) => {
    e.preventDefault();
    if (columns > 2) {
      const newTableData = tableData.map((row, rowIndex) => {
        if (rowIndex === 0) {
          // If it's the first row, keep "SR.NO" intact
          return ["SR.NO", ...row.slice(2)]; // Skip the second column
        } else {
          // For other rows, remove the second column
          return row.slice(0, 1).concat(row.slice(2));
        }
      });
      setTableData(newTableData);
      setColumns(columns - 1);
    }
  };
  const handleCellChange = (rowIndex, colIndex, e) => {
    e.preventDefault();
    const newValue = e.target.innerText;
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = newValue;
    setTableData(newTableData);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let [finalData, setFinalData] = useState({
    general_Information: {
      reference_number: "",
      subject: "",
      letter: "",
    },
    taxation_Details: {
      current_total_amount: "",
      discount: "",
      total_after_discount: "",
      cgst: "",
      scgst: "",
      final_total_amount: "",
    },
    table_Data: {},
  });

  const dispatch = useDispatch();
  // const { getworkOrderdata, loading } = useSelector(
  //   (state) => state.workOrders
  // );


  const handleFormSubmit = (form_data) => {
    //  console.log(form_data);
    //  console.log(tableData);
    finalData = {
      general_Information: {
        reference_number: form_data.reference_number,
        subject: form_data.subject,
        letter: form_data.letter,
      },
      taxation_Details: {
        current_total_amount: form_data.current_total_amount,
        discount: form_data.discount,
        total_after_discount: form_data.total_after_discount,
        cgst: form_data.cgst,
        scgst: form_data.scgst,
        final_total_amount: form_data.final_total_amount,
      },
      table_Data: tableData,
    };
    // console.log(finalData);
    // dispatch(createWorkOrderAction(finalData))

    setFinalData(finalData);
    console.log(finalData);

    const pdf = new jsPDF();

    pdf.setProperties({
      title: "Your PDF Title",
      subject: finalData?.general_Information?.subject,
      author: "Your Name",
    });

    pdf.text(20, 20, "General Information:");
    pdf.text(
      20,
      30,
      `Reference Number: ${finalData.general_Information.reference_number}`
    );
    pdf.text(20, 40, `Subject: ${finalData.general_Information.subject}`);
    pdf.text(20, 50, `Letter: ${finalData.general_Information.letter}`);

    pdf.text(20, 70, "Taxation Details:");
    pdf.text(
      20,
      80,
      `Current Total Amount: ${finalData.taxation_Details.current_total_amount}`
    );
    pdf.text(20, 90, `Discount: ${finalData.taxation_Details.discount}`);
    pdf.text(
      20,
      100,
      `Total After Discount: ${finalData.taxation_Details.total_after_discount}`
    );
    pdf.text(20, 110, `CGST: ${finalData.taxation_Details.cgst}`);
    pdf.text(20, 120, `SCGST: ${finalData.taxation_Details.scgst}`);
    pdf.text(
      20,
      130,
      `Final Total Amount: ${finalData.taxation_Details.final_total_amount}`
    );

    pdf.text(20, 150, "Table Data:");
    const columns = Object.keys(finalData.table_Data[0]); // Assuming all rows have the same structure

    const rows = finalData.table_Data.map((row) =>
      columns.map((column) => (row[column] !== undefined ? row[column] : ""))
    );

    pdf.autoTable({
      startY: 160,
      head: [columns],
      body: rows,
    });

    // Save the PDF
    pdf.save("output.pdf");

    dispatch(createWorkOrderAction(finalData));

    setColumns(1);
    setRows(1);
    setTableData(generateTable(1, 1));
    reset();
  };


  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="pl-2">
          <div className=" text-2xl font-medium">Work Order</div>
          <div className="flex">
            <p className="flex text-base text-[#5C59E8] font-medium pr-2">
              Order Generation
            </p>
            <div className="text-[#667085]">
              <ChevronRightIcon />
            </div>
            <p className="flex text-base text-[#667085] font-medium pl-1">
              Work Order
            </p>
          </div>
        </div>
        <div className="p-2"></div>
        <div className="flex flex-col ">
          <div className="flex flex-col w-full p-4  border-2 rounded-md bg-white">
            <div className="py-2 text-lg font-semibold">
              General Information
            </div>
            <div className="py-2">
              <div className="text-[#4D5464] font-semibold py-2">
                Reference Number :{" "}
              </div>
              <div className="border-2 rounded-md ">
                <input
                  {...register("reference_number", {
                    required: "Reference Number is required",
                  })}
                  id="reference_number"
                  type="text"
                  className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                  placeholder="Enter the Reference Number"
                ></input>
              </div>
              {errors.reference_number && (
                <p className="text-red-500">
                  {errors.reference_number.message}
                </p>
              )}
            </div>
            <div className="py-2">
              <div className="text-[#4D5464] font-semibold py-2">
                Subject :{" "}
              </div>
              <div className="border-2 rounded-md ">
                <input
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  id="subject"
                  type="text"
                  className="text-[#858D9D] bg-[#F9F9FC] w-full p-2"
                  placeholder="Enter the Subject"
                ></input>
              </div>
              {errors.subject && (
                <p className="text-red-500">{errors.subject.message}</p>
              )}
            </div>
            <div className="py-2">
              <div className="text-[#4D5464] font-semibold py-2">Letter : </div>
              <div className="border-2 rounded-md">
                <input
                  {...register("letter", {
                    required: "Letter is required",
                  })}
                  id="letter"
                  type="text"
                  className="text-[#858D9D]  bg-[#F9F9FC] h-36 w-full p-2  "
                  placeholder="Type Product Description Here"
                  autoFocus
                ></input>
              </div>
              {errors.letter && (
                <p className="text-red-500">{errors.letter.message}</p>
              )}
            </div>
          </div>
          <div className="p-4"></div>
          <div className="flex flex-col w-full p-4  border-2 rounded-md bg-white">
            <div className="py-2 text-lg font-semibold">Taxation Details</div>
            <div>
              <div className="flex flex-row">
                <div className="w-1/2 mr-2">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      Current Total Amount :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("current_total_amount", {
                          required: "Current Total Amount is required",
                        })}
                        id="current_total_amount"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Current Total Amount"
                      ></input>
                    </div>
                    {errors.current_total_amount && (
                      <p className="text-red-500">
                        {errors.current_total_amount.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-1/2 mx-2">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      Discount :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("discount", {
                          required: "Discount  is required",
                        })}
                        id="discount"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Enter the Discount value "
                      ></input>
                    </div>
                    {errors.discount && (
                      <p className="text-red-500">{errors.discount.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/2  mr-2 ">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      Total After Discount :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("total_after_discount", {
                          required: "Total After Discount is required",
                        })}
                        id="total_after_discount"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Total Discount"
                      ></input>
                    </div>
                    {errors.total_after_discount && (
                      <p className="text-red-500">
                        {errors.total_after_discount.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-1/2 mx-2 ">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      CGST :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("cgst", {
                          required: "CGST required",
                        })}
                        id="cgst"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Enter the CGST value"
                      ></input>
                    </div>
                    {errors.cgst && (
                      <p className="text-red-500">{errors.cgst.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/2  mr-2">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      SCGST :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("scgst", {
                          required: "SCGST required",
                        })}
                        id="scgst"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Enter the SCGST value"
                      ></input>
                    </div>
                    {errors.scgst && (
                      <p className="text-red-500">{errors.scgst.message}</p>
                    )}
                  </div>
                </div>
                <div className="w-1/2 mx-2">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      Total Amount :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("final_total_amount", {
                          required: "Total Amount required",
                        })}
                        id="final_total_amount"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Total Amount"
                      ></input>
                    </div>
                    {errors.final_total_amount && (
                      <p className="text-red-500">
                        {errors.final_total_amount.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
             
            </div>
          </div>
          <div className="p-4"></div>
          <div className="flex flex-col w-full p-4  border-2 rounded-md bg-white">
            <div className="flex flex-row justify-between">
              <div className="flex items-center text-lg font-semibold">
                Orders
              </div>
              <div className="flex justify-end">
                <button
                  onClick={removeColumn}
                  className="px-2 text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2  rounded-lg"
                >
                  <RemoveIcon />
                </button>
                <button
                  onClick={addColumn}
                  className="px-2 text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2  rounded-lg"
                >
                  <AddIcon />
                </button>
              </div>
            </div>
            <div className="p-4"></div>
            <div className="flex ">
              <table className="border-2  ">
                <tbody className="text-[#4D5464]">
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td
                          className="p-4 border-2"
                          key={colIndex}
                          contentEditable={true}
                          onBlur={(e) =>
                            handleCellChange(rowIndex, colIndex, e)
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-2"></div>
            <div className=" flex justify-end">
              <button
                onClick={removeRow}
                className="p-2  text-xs text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2  rounded-md"
              >
                Remove Order -
              </button>
              <button
                onClick={addRow}
                className="p-2  text-xs text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2  rounded-md"
              >
                Add Order +
              </button>
            </div>
            <div className="p-2"></div>
          </div>
          <div className="p-2"></div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="p-2 px-4  text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2  rounded-lg"
          >
            Submit
          </button>
        </div>
        <div className="p-6"></div>
      </form>

      
    </>
  );
};

export default WorkOrder;
