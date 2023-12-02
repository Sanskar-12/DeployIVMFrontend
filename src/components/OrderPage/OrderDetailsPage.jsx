import { Link, useParams } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import { useState, useEffect } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByIDActions } from "../../Actions/orderActions";
import Loader from "../Loader/Loader";
import moment from "moment";
import { getVendorDataByIDAction } from "../../Actions/vendorActions";

const Products = [
  {
    name: "Chalk",
    id: 1,
    quantity: 3,
    price: 100,
  },
  {
    name: "Duster",
    id: 2,
    quantity: 3,
    price: 100,
  },
  {
    name: "Coffee",
    id: 3,
    quantity: 4,
    price: 1000,
  },
  {
    name: "Book",
    id: 4,
    quantity: 13,
    price: 10,
  },
];

const OrderDetailsPage = () => {
  const [totalCost, setTotalCost] = useState(0);
  const { orderId } = useParams();

  const dispatch = useDispatch();

  const { order, loading } = useSelector((state) => state.orders);
  const { vendor } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(getAllOrderByIDActions(orderId));
  }, [orderId, dispatch]);

  useEffect(() => {
    const id = order?.vendor_id;
    dispatch(getVendorDataByIDAction(id));
  }, [order, dispatch]);

  useEffect(() => {
    let newTotalCost = 0;
    order?.items?.forEach(
      (item) => (newTotalCost = newTotalCost + item?.quantity * item.unitPrice)
    );
    setTotalCost(newTotalCost);
  }, [order]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex flex-col px-4 ">
              <p className="text-[24px]"> Order Details</p>
              <div className="flex flex-row">
                <Link to="/">
                  <div className="font-medium text-[#5C59E8] mr-3 hover:underline flex items-center">
                    Dashboard
                  </div>
                </Link>

                <Link to="/orders-page">
                  <div className="text-[#667085]">
                    {" "}
                    <ChevronRightIcon /> Order List
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-row h-1/2  items-start justify-between">
              <div className="flex flex-col bg-white p-6 m-4   border-2  border-[#E0E2E7] rounded-md">
                <div>
                  <div className="flex pt-2 flex-row justify-between">
                    <div className="text-lg font-semibold flex  items-center ">
                      Order {order?._id?.substring(0, 6)}
                    </div>
                    <div className="bg-[#FDF1E8] rounded-full h-auto w-auto  text-center text-sm p-2 text-[#E46A11] font-extrabold">
                      {order?.orderStatus}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-2 pt-4 ">
                    <div className="mt-6 ">
                      <span className="bg-[#E0E2E7] p-2 rounded-full">
                        <StorefrontIcon />
                      </span>
                    </div>
                    <div className="p-2 pb-2 pt-6 font-medium text-md">
                      {order?.department}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-2 py-6">
                    <div>
                      <span className="bg-[#E0E2E7] p-2 rounded-full">
                        <CreditCardIcon />
                      </span>
                      <span className="p-2  font-medium text-md">
                        {order?.itemtype}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-2 py-6">
                    <div>
                      <span className="bg-[#E0E2E7] p-2 rounded-full">
                        <EventAvailableIcon />
                      </span>
                      <span className="p-2  font-medium text-md">Ordered</span>
                    </div>
                    <div className="mr-6">
                      {moment(order?.createdBy).format("DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white p-6 m-4 w-1/4  border-2   border-[#E0E2E7] rounded-md">
                <div>
                  <div className="flex flex-row justify-between">
                    <div className="text-lg font-semibold">Details</div>
                  </div>
                  <div className="flex flex-col justify-between mt-4 w-full">
                    <div className="py-4 mt-6">
                      <span className="bg-[#E0E2E7] p-2 rounded-full">
                        <FmdGoodIcon />
                      </span>
                      <span className="p-2 font-medium text-md">
                        Location : {order?.lab}
                      </span>
                    </div>
                    <div className="py-4 mt-6">
                      <span className="bg-[#E0E2E7] p-2 rounded-full">
                        <LocalShippingIcon />
                      </span>
                      <span className="p-2  font-medium text-md">Invoice</span>
                    </div>
                    <div className="py-4 mt-6 w-full">
                      <span className="bg-[#E0E2E7] p-2 rounded-full">
                        <LocalShippingIcon />
                      </span>
                      <span className="p-2  font-medium text-md">
                        Initiator : {order?.requisition_name}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white p-6 m-4 w-1/4  border-2  border-[#E0E2E7] rounded-md">
                <div>
                  <div className="flex flex-row justify-between">
                    <div className="text-lg font-semibold">Vendor </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="py-6 flex flex-row justify-between ">
                      <div className="flex flex-row">
                        <div className="bg-[#E0E2E7] p-2  rounded-full">
                          <Person2OutlinedIcon />
                        </div>
                        <div className="p-2  font-medium text-md">Name </div>
                      </div>
                      <div className="p-2">{vendor?.vendorName}</div>
                    </div>
                    <div className="py-6 flex flex-row justify-between">
                      <div className="flex flex-row">
                        <div className="bg-[#E0E2E7] p-2 rounded-full">
                          <EmailOutlinedIcon />
                        </div>
                        <div className="p-2 font-medium text-md">Email</div>
                      </div>
                      <div className="p-2">{vendor?.email} </div>
                    </div>
                    <div className="py-5 flex flex-row justify-between">
                      <div className="flex flex-row">
                        <div className="bg-[#E0E2E7] p-2 rounded-full">
                          <SmartphoneOutlinedIcon />
                        </div>
                        <div className="p-2 font-medium text-md">Phone</div>
                      </div>
                      <div className="p-2">{vendor?.mobileNumber} </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-3/5 h-80">
                <div>
                  <div className="relative overflow-x-auto mx-2 rounded-md">
                    <table className="w-full text-sm text-left text-gray-500 border-2  ">
                      <thead className="text-xs text-gray-700 uppercase bg-[#F9F9FC]">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-center">
                            Sr.No
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            Unit Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {order?.items?.map((data, index) => (
                          <tr
                            key={index}
                            className="bg-white  border-[#E0E2E7] border-b"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                              
                              {data._id.substring(0, 6)}
                            </td>
                            <td className="px-6 py-4 text-[#5C59E8] font-bold">
                              {data?.description}
                            </td>
                            <td className="px-6 py-4">{data?.quantity}</td>
                            <td className="px-6 py-4">Rs. {data?.unitPrice}</td>
                            <td className="px-6 py-4">
                              Rs. {data?.quantity * data?.unitPrice}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tbody className="text-center">
                        <tr className="bg-white border-b">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            Total
                          </td>
                          <td className="px-6 py-4  text-gray-900 font-bold">
                            Rs. {totalCost}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-2/5 h-80">
                <div className="flex flex-col p-6 bg-white border-2   border-[#E0E2E7] rounded-md">
                  <div className="flex flex-row justify-between">
                    <div className="text-lg font-semibold">Address</div>
                  </div>
                  <div className="py-6 flex flex-row justify-between ">
                    <div className="flex flex-row">
                      <div className="bg-[#E0E2E7] p-2 rounded-full">
                        <FmdGoodIcon />
                      </div>
                      <div className="p-2  font-medium text-md">Billing</div>
                    </div>
                    <div className="p-2">{vendor?.billingaddress}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetailsPage;
