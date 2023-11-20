import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TuneIcon from "@mui/icons-material/Tune";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import {
  approveOrdersAction,
  approveOrdersforApproverAction,
  declineOrdersAction,
  declineOrdersforApproverAction,
  getAllOrdersAction,
  getAllOrdersForApprover,
  getAllOrdersForIntiatorSuperAdminandAdminAction,
} from "../../Actions/orderActions";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
// import Pagination from "react-js-pagination";

const Order = () => {
  const [open, setOpen] = useState(true);
  const [contentopen, setcontentOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [approverremark, setapproverRemark] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const { onClose, isOpen, onOpen } = useDisclosure();

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

  const handleRemark = () => {
    onOpen();
  };

  const onCloseHandler = () => {
    onClose();
  };

  const remarkHandler = (e) => {
    e.preventDefault();
    onClose();
  };

  const approverRemarkHandler = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleApprove = async (orderId, remark) => {
    console.log(remark);
    await dispatch(approveOrdersAction(orderId, remark));
    setRemark("");
    dispatch(getAllOrdersAction());
  };

  const handleDecline = async (orderId, remark) => {
    await dispatch(declineOrdersAction(orderId, remark));
    setRemark("");
    dispatch(getAllOrdersAction());
  };

  const handleApproveforApprover = async (orderId,approverremark) => {
    await dispatch(approveOrdersforApproverAction(orderId, approverremark));
    setapproverRemark("");
    dispatch(getAllOrdersForApprover());
  };

  const handleDeclineforApprover = async (orderId,approverremark) => {
    await dispatch(declineOrdersforApproverAction(orderId, approverremark));
    setapproverRemark("");
    dispatch(getAllOrdersForApprover());
  };

  useEffect(() => {
    if (user?.user_level === "Verifier") {
      dispatch(getAllOrdersAction());
    } else if (user?.user_level === "Intiator") {
      dispatch(getAllOrdersForIntiatorSuperAdminandAdminAction());
    } else if (user?.user_level === "Approval") {
      dispatch(getAllOrdersForApprover());
    }
  }, [dispatch, user?.user_level]);

  // const setCurrentPageNo = (e) => {
  //   setCurrentPage(e);
  // };

  const toggleFilter = () => {
    setOpen(!open);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            {" "}
            {/* top bar orders */}
            <div>
              <div className="text-[24px]">Orders</div>
              <div className="flex">
                <a
                  href="/"
                  className="font-medium text-[#5C59E8] mr-3 hover:underline flex items-center"
                >
                  Dashboard
                </a>
                <p className="font-medium text-2xl text-[#A3A9B6] mr-3">
                  {" "}
                  <ArrowForwardIosIcon />{" "}
                </p>
                <p className="flex items-center text-base text-[#667085]">
                  Order List
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <div className="mt-3 md:mt-0 md:flex">
                

                <div className="p-0">
                  {!open && (
                    <>
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
                    </>
                  )}
                </div>

                <button
                  href="#"
                  className="md:mr-2 md:w-40  w-2/5  mr-5 px-2 py-2 rounded-md shadow-sm text-sm font-medium text-[#667085] bg-white border-t border-b border-gray-200 rounded-l-lg rounded-r-lg hover:bg-gray-100 hover:text-[#5C59E8] focus:z-10 focus:ring-2 focus:ring-[#5C59E8] focus:text-[#5C59E8] "
                >
                  <CalendarMonthIcon /> Select Dates
                </button>
                <button
                  onClick={toggleFilter}
                  href="#"
                  className="md:mr-6 mr-3 md:w-40 md:ml-0 w-2/5 ml-6 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-[#667085] bg-white border-t border-b border-gray-200 rounded-l-lg rounded-r-lg hover:bg-gray-100 hover:text-[#5C59E8] focus:z-10 focus:ring-2 focus:ring-[#5C59E8] focus:text-[#5C59E8] "
                >
                  <TuneIcon /> Filters
                </button>
              </div>
            </div>
          </div>

          <div className="block bg-transparent m-4 p-4 overflow-x-auto ">
            <table className="w-full shadow-md  border-2 rounded-2xl ">
              <thead className="w-full">
                <tr className="border border-solid ">
                  <th className="text-md px-6 py-3">Order Id</th>
                  <th className="text-md px-6 py-3">Date</th>

                  <th className="text-md px-6 py-3">Requistion Subject</th>
                  <th className="text-md px-6 py-3">Department</th>
                  <th className="text-md px-6 py-3">Room No/Location</th>
                  <th className="text-md px-6 py-3">Expense Type</th>
                  {user?.user_level === "Intiator" && (
                    <th className="text-md px-6 py-3">Status</th>
                  )}
                  {user?.user_level === "Verifier" && (
                    <>
                      <th className="text-md px-6 py-3">Action</th>
                      <th className="text-md px-6 py-3">Remark</th>
                    </>
                  )}
                  {user?.user_level === "Approval" && (
                    <>
                      <th className="text-md px-6 py-3">Action</th>
                      <th className="text-md px-6 py-3">Verified By</th>
                      <th className="text-md px-6 py-3">Verifier Remark</th>
                      <th className="text-md px-6 py-3">Remark</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders?.orders?.map((order) => (
                  <tr key={order?._id}>
                    <>
                      <th className="text-md border-b text-center text-[#5C59E8] px-6 py-3">
                        <Link to={`/order-details-page/${order._id}`}>
                          {order?._id.substring(0, 6)}
                        </Link>
                      </th>
                      <td className="text-md border-b text-center px-6  py-3">
                        {moment(order?.createdBy).format("DD/MM/YYYY")}
                      </td>
                      <td className="text-md border-b text-center px-6  py-3">
                        {order?.requisition_name}
                      </td>
                      <td className="text-md border-b text-center px-6 py-3">
                        {order?.department}
                      </td>
                      <td className="text-md border-b text-center px-6 py-3">
                        {order?.lab}
                      </td>
                      <td className="py-3 border-b px-6 text-center">
                        {order?.itemtype}
                      </td>
                      {user?.user_level === "Intiator" && (
                        <td className="text-md border-b px-6 py-3">
                          <p>{order?.orderStatus}</p>
                        </td>
                      )}
                      {user?.user_level === "Verifier" && (
                        <>
                          <td className="text-md border-b px-6 py-3">
                            <div className="flex justify-between  ">
                              <button
                                onClick={() =>
                                  handleApprove(order?._id, remark)
                                }
                                className="rounded-full p-2 border-slate-900 "
                                disabled={remark.length === 0}
                              >
                                {" "}
                                <p className="text-green-600">Approve</p>
                              </button>
                              <button
                                onClick={() =>
                                  handleDecline(order?._id, remark)
                                }
                                className="rounded-full p-2  bg-red"
                                disabled={remark.length === 0}
                              >
                                <p className="text-red-600">Decline</p>
                              </button>
                            </div>
                          </td>
                          <td className="py-3 border-b px-6 text-center">
                            <EditIcon onClick={handleRemark} />
                          </td>
                        </>
                      )}
                      {user?.user_level === "Approval" && (
                        <>
                          <td className="text-md border-b px-6 py-3">
                            <div className="flex justify-between  ">
                              <button
                                onClick={() =>
                                  handleApproveforApprover(order?._id,approverremark)
                                }
                                className="rounded-full p-2 border-slate-900 "
                                disabled={approverremark.length === 0}
                              >
                                {" "}
                                <p className="text-green-600">Approve</p>
                              </button>
                              <button
                                onClick={() =>
                                  handleDeclineforApprover(order?._id,approverremark)
                                }
                                className="rounded-full p-2  bg-red"
                                disabled={approverremark.length === 0}
                              >
                                <p className="text-red-600">Decline</p>
                              </button>
                            </div>
                          </td>
                          <td className="py-3 border-b px-6 text-center">
                            {order?.verifierName}
                          </td>
                          <td className="py-3 border-b px-6 text-center">
                            {order?.remark}
                          </td>
                          <td className="py-3 border-b px-6 text-center">
                            <EditIcon onClick={handleRemark} />
                          </td>
                        </>
                      )}
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {resultPerPage < orderCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={orderCount}
                  onChange={setCurrentPageNo}
                  nextPageText=">"
                  prevPageText="<"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )} */}
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter={"blur(10px)"} />
            <ModalContent>
              <ModalHeader>Add a Remark</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Container>
                  {user?.user_level === "Verifier" && (
                    <form onSubmit={(e) => remarkHandler(e)}>
                      <VStack spacing={"8"}>
                        <Input
                          type="text"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                        />
                        <Button w={"full"} colorScheme="purple" type="submit">
                          Add
                        </Button>
                      </VStack>
                    </form>
                  )}
                  {user?.user_level === "Approval" && (
                    <form onSubmit={(e) => approverRemarkHandler(e)}>
                      <VStack spacing={"8"}>
                        <Input
                          type="text"
                          value={approverremark}
                          onChange={(e) => setapproverRemark(e.target.value)}
                        />
                        <Button w={"full"} colorScheme="purple" type="submit">
                          Add
                        </Button>
                      </VStack>
                    </form>
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
        </>
      )}
    </>
  );
};

export default Order;
