import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyModal from "./MyModal";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusActions, getAllInwardActions } from "../../Actions/inwardActions";
import Loader from "../Loader/Loader";

const Inward = () => {
  const [open, setOpen] = useState(true);
  // const [open1, setOpen1] = useState(true);
  // const [close, setClose] = useState(false);
  const [contentopen, setcontentOpen] = useState(false);
  const [showMyModal, setShowMyModal] = useState(false);

  const handleOnClose = () => setShowMyModal(false);

  const dispatch = useDispatch();
  const { inward, loading } = useSelector((state) => state.inward);

  useEffect(() => {
    dispatch(getAllInwardActions());
  }, [dispatch]);

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
  // const toggleDate = () => {
  //   setOpen1(!open1);

  //   if (open1) {
  //     setClose(true);
  //   }
  // };

  const handlemodal = () => {
    if (showMyModal) {
      setShowMyModal(false);
    } else {
      setShowMyModal(true);
    }
  };

  const handleChange = async (event, orderId) => {
    event.preventDefault()

    await dispatch(changeStatusActions(orderId,event.target.value))
    dispatch(getAllInwardActions());
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
                <div className="text-[24px]">Inward</div>
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
                    Inward
                  </p>
                </div>
              </div>
              <div className="mt-4 md:flex justify-center md:justify-center">
                <div className="mt-3 md:mt-0 md:flex">
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

                  <button
                    onClick={handlemodal}
                    href="#"
                    className="md:mr-2 md:w-40  w-2/5  mr-5 px-2 py-2 rounded-md shadow-sm text-sm font-medium text-[#667085] bg-white border-t border-b border-gray-200 rounded-l-lg rounded-r-lg hover:bg-gray-100 hover:text-[#5C59E8] focus:z-10 focus:ring-2 focus:ring-[#5C59E8] focus:text-[#5C59E8] "
                  >
                    <CalendarMonthIcon /> Select Dates
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="block bg-transparent m-4 p-4 overflow-x-auto w-full ">
                <table className="w-full shadow-md  border-2 rounded-2xl">
                  <thead className="w-full">
                    <tr className="border border-solid">
                      <th className="text-md px-6 py-3">
                        Order Id
                      </th>
                      <th className="text-md px-6 py-3">
                        Requisitioner Name
                      </th>
                      <th className="text-md px-6 py-3">
                        Department
                      </th>
                      <th className="text-md px-6 py-3">
                        Lab
                      </th>
                      <th className="text-md px-6 py-3">
                        Item Type
                      </th>
                      <th className="text-md px-6 py-3">
                        Approved By
                      </th>
                      <th className="text-md px-6 py-3 ">
                        Approver Remark
                      </th>
                      <th className="text-md px-6 py-3 ">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {inward?.map((order) => (
                <tr key={order?._id}>
                  <th className="text-md text-center border-b px-6 py-3 text-[#5C59E8]">
                    {order?._id.substring(0, 6)}
                  </th>
                  <td className="text-md text-center px-6  py-3 border-b">
                    {order?.requisition_name}
                  </td>
                  <td className="text-md  border-b text-center px-6 py-3">
                    {order?.department}
                  </td>
                  <td className="text-md text-center  border-b px-6 py-3">
                    {order?.lab}
                  </td>
                  <td className="text-md text-center  border-b px-6 py-3">
                    {order?.itemtype}
                  </td>
                  <td className="text-md text-center  border-b px-6 py-3">
                    {order?.verifierName}
                  </td>

                  <td className="text-md text-center  border-b px-6 py-3">
                    {order?.approverremark}
                  </td>
              

                  <td className="text-md border-b text-center ">
                    <select
                      className="p-2 border rounded-md"
                      value={order?.orderStatus}
                      onChange={(e) => handleChange(e, order?._id)}
                      defaultValue={"Select an option"}
                    >
                      <option value="">Select an option</option>
                      <option value="Receieved">Receieved</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Issues">Issues</option>
                      <option value="Others">Other</option>
                    </select>
                  </td>
                </tr>
              ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <MyModal onClose={handleOnClose} visible={showMyModal} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Inward;
