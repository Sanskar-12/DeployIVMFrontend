import {  useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm } from "react-hook-form";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { createPurchaseOrderAction } from "../../Actions/purchaseOrderActions";

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

const PurchaseOrder = () => {
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
        return ["SR.NO", "Add data", ...row.slice(1)];
      } else {
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
          return ["SR.NO", ...row.slice(2)]; 
        } else {
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
      to: "",
      subject: "",
      letter: "",
    },
    table_Data: {},
    terms_and_conditions: {
      payment: "",
      waranty: "",
      delivery: "",
    },
  });

  const dispatch = useDispatch();
  

  const handleFormSubmit = (form_data) => {
    console.log(form_data);
    finalData = {
      general_Information: {
        reference_number: form_data.reference_number,
        to: form_data.to,
        subject: form_data.subject,
        letter: form_data.letter,
      },

      table_Data: tableData,
      terms_and_conditions: {
        payment: form_data.payment,
        waranty: form_data.waranty,
        delivery: form_data.delivery,
      },
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
    pdf.text(20, 40, `To: ${finalData.general_Information.to}`);
    pdf.text(20, 50, `Subject: ${finalData.general_Information.subject}`);
    pdf.text(20, 60, `Letter: ${finalData.general_Information.letter}`);

    pdf.text(20, 70, "Terms and Conditions: ");
    pdf.text(20, 80, `Payment: ${finalData.terms_and_conditions.payment}`);
    pdf.text(20, 90, `Waranty: ${finalData.terms_and_conditions.waranty}`);
    pdf.text(20, 100, `Delivery: ${finalData.terms_and_conditions.delivery}`);

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

    dispatch(createPurchaseOrderAction(finalData));

    setColumns(1);
    setRows(1);
    setTableData(generateTable(1, 1));
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="pl-2">
          <div className=" text-2xl font-medium">Purchase Order</div>
          <div className="flex">
            <p className="flex text-base text-[#5C59E8] font-medium pr-2">
              Order Generation
            </p>
            <div className="text-[#667085]">
              <ChevronRightIcon />
            </div>
            <p className="flex text-base text-[#667085] font-medium pl-1">
              Purchase Order
            </p>
          </div>
        </div>
        <div className="p-2"></div>
        <div className="grid grid-cols-5 gap-3 ">
          <div className="col-span-4 bg-[#F9F9FC] mt-4">
            <div className="flex flex-col w-full p-4  border-2 rounded-xl bg-white">
              <div className="py-2 text-lg font-semibold">
                General Information
              </div>
              <div className="py-2">
                <div className="text-[#4D5464] font-semibold py-2">
                  Reference Number :{" "}
                </div>
                <div className="border-2 rounded-xl ">
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
                <div className="text-[#4D5464] font-semibold py-2">To : </div>
                <div className="border-2 rounded-xl ">
                  <input
                    {...register("to", {
                      required: "To is required",
                    })}
                    id="to"
                    type="text"
                    className="text-[#858D9D]  bg-[#F9F9FC] h-36 w-full p-2  "
                    placeholder="Type Product Description here.."
                  ></input>
                </div>
                {errors.to && (
                  <p className="text-red-500">{errors.to.message}</p>
                )}
              </div>
              <div className="py-2">
                <div className="text-[#4D5464] font-semibold py-2">
                  Subject :{" "}
                </div>
                <div className="border-2 rounded-xl ">
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
                <div className="text-[#4D5464] font-semibold py-2">
                  Letter :{" "}
                </div>
                <div className="border-2 rounded-xl">
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

            <div className="flex flex-col w-full p-4  border-2 rounded-xl bg-white">
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
                    className="px-2 text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2  rounded-md"
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
                  className="p-2  text-xs text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2  rounded-lg"
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
            <div className="p-4"></div>
            <div className="flex flex-col w-full p-4  border-2 rounded-xl bg-white">
              <div className="py-2 text-lg font-semibold">
                Terms and Conditions
              </div>
              <div className="flex flex-col">
                <div className="w-full ">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      Payment :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("payment", {
                          required: "Payment is required",
                        })}
                        id="payment"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Payment.."
                      ></input>
                    </div>
                    {errors.payment && (
                      <p className="text-red-500">{errors.payment.message}</p>
                    )}
                  </div>
                </div>
                <div className="w-full ">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      Waranty :{" "}
                    </div>
                    <div className="border-2 rounded-md ">
                      <input
                        {...register("waranty", {
                          required: "Waranty is required",
                        })}
                        id="waranty"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Waranty.."
                      ></input>
                    </div>
                    {errors.waranty && (
                      <p className="text-red-500">{errors.waranty.message}</p>
                    )}
                  </div>
                </div>
                <div className="w-full ">
                  <div className="py-2">
                    <div className="text-[#4D5464] font-semibold py-2">
                      Delivery :{" "}
                    </div>
                    <div className="border-2 rounded-xl ">
                      <input
                        {...register("delivery", {
                          required: "Delivery is required",
                        })}
                        id="delivery"
                        type="text "
                        className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                        placeholder="Delivery..."
                      ></input>
                    </div>
                    {errors.delivery && (
                      <p className="text-red-500">{errors.delivery.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4"></div>
            <div className="p-2"></div>
          </div>
          <div className=" mt-4 bg-[#F9F9FC]">
            {" "}
            {/*Right side div*/}
            <div className="h-auto rounded-xl border-2 bg-white overflow-auto">
              <table className="w-full font-medium leading-5  text-[#333843] text-sm text-center bg-white ">
                <thead className="bg-[#F9F9FC] border-b text-base">
                  <tr>
                    <td className="py-4">Customer</td>
                    <td className="py-4">Amount</td>
                  </tr>
                </thead>

                <tbody className="leading-3 text-center">
                  <tr className="border-b">
                    <td className="py-4">Current Total</td>
                    <td className="text-gray-500 py-4">121.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Discounts</td>
                    <td className="text-gray-500 py-4">121.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Grand Total</td>
                    <td className="text-gray-500 py-4">121.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">CGST @ 2.5%</td>
                    <td className="text-gray-500 py-4">121.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">SGST @ 2.5%</td>
                    <td className="text-gray-500 py-4">121.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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

export default PurchaseOrder;
