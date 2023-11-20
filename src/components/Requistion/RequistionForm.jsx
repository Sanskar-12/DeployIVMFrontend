import { useForm, Controller } from "react-hook-form";
// import ReactDOM from "react-dom";
// import InventoryPage from "../Inventory/InventoryPage";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useSelector } from "react-redux/es/hooks/useSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux"
import { createOrderAction } from "../../Actions/requisitionActions";
import { server } from "../../store";

const RequisitionForm = () => {

  const dispatch=useDispatch()

  const [departments, setDepartments] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [orderDetail, setOrderDetail] = useState({
    description: "",
    quantity: "",
    unitPrice: "",
    total: "",
  });

  const [totalOrders, setTotalOrders] = useState([]);
  const [error, setError] = useState("");

  const [remarks, setRemarks] = useState("");
  // const [finalData, setFinalData] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetail({
      ...orderDetail,
      [name]: value,
    });
    console.log(orderDetail);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (
      orderDetail.description.trim() !== "" &&
      orderDetail.quantity.trim() !== "" &&
      orderDetail.unitPrice.trim() !== "" &&
      orderDetail.total.trim() !== ""
    ) {
      setTotalOrders((prevTotalOrders) => [...prevTotalOrders, orderDetail]);
      setOrderDetail({
        description: "",
        quantity: "",
        unitPrice: "",
        total: "",
      });
      setTotalOrders((prevTotalOrders) => {
        // console.log("Updated Total Orders:", prevTotalOrders);
        return prevTotalOrders;
      });
      setError("");
    } else {
      setError("Please complete all fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  // console.log(totalOrders);

  const handleDelete = (index) => {
    const updatedTotalOrders = [...totalOrders];

    updatedTotalOrders.splice(index, 1);
    
    setTotalOrders(updatedTotalOrders);
  };
  
  //console.log(totalOrders);
  
  const handleRemarks = (e) => {
    setRemarks(e);
  };
  const user = JSON.parse(sessionStorage.getItem("userId"));
  const username = user.username;

  const handleFormSubmit = (data) => {
    console.log(data);
    const formData = {
      requisition_name: username,
      department: data.department,
      lab: data.lab,
      itemtype: data.category,
      vendor_id: data.vendorName,
      vedorAddress: selectedVendor.addrs,
      telephone: selectedVendor.contact,
      items: totalOrders,
      remarks: remarks,
      orderStatus: "Processing",
    };

    // setFinalData(formData);

    // /console.log(formData);

    dispatch(createOrderAction(formData))
    

    reset();
    setTotalOrders([]);

  };


  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState(null);


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`${server}/department/get-department`,{
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.department);
        setDepartments(response.data.department);
        // console.log(departments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get( `${server}/vendor/get-vendor`,{
        withCredentials: true,
      })
      .then((response) => {
        
        console.log(response.data);
        setVendors(response.data.vendors);
        // console.log(departments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(selectedDept);
    if (selectedDept) {
      axios
        .get(`${server}/department/get-department-by-name/${selectedDept}`,{
          withCredentials: true,
        })
        .then((response) => {
          setLabs(response.data.department[0].labs);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDept]);

  useEffect(() => {
    console.log(selectedVendorId);
    if (selectedVendorId) {
      axios
        .get(`${server}/vendor/get-vendor-byId/${selectedVendorId}`,{
          withCredentials: true,
        })
        .then((response) => {
          setSelectedVendor(response.data.vendor);
          console.log(response.data.vendor);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedVendorId]);

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="w-full  flex flex-col border border-solid rounded-md ">
          <div className="w-full flex rounded-md  bg-[#EFEFFD]  ">
            <div className="basis-1/2 h-auto p-6 m-4 bg-[#EFEFFD]border-solid border-r-2 border-black">
              <span className="text-xl font-bold text-indigo-600">
                Requisitioner Information :
              </span>
              <div className="py-2 ">
                <label className="text-[#5C59E8] font-semibold">Name: </label>
                <input
                  type="text"
                  {...register("requistion_name", {
                    required: "Requisitioner name is required",
                  })}
                  id="requistion_name"
                  className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "
                  placeholder="Name"
                  value={username}
                />
                {errors.requistion_name&& (
                  <p className="text-red-500">
                    {errors.requistion_name.message}
                  </p>
                )}
              </div>
              <div className="py-2">
                <label className="text-[#5C59E8] font-semibold">
                  Department:{" "}
                </label>

                <Controller
                  name="department"
                  control={control}
                  rules={{ required: "Please select a department" }}
                  render={({ field }) => (
                    <select
                      className="border p-1 rounded-md focus:border-gray-400 px-1 w-full focus:outline-none focus:ring-0"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);

                        setSelectedDept(e.target.value);
                      }}
                    >
                      <option value="">Select Department</option>
                      {departments?.map((department, index) => (
                        <option key={index} value={department.name}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.department && (
                  <p className="text-red-500">{errors.department.message}</p>
                )}
              </div>
              <div className="py-2">
                <span className="text-[#5C59E8]  font-semibold">Lab: </span>
                <Controller
                  name="lab"
                  control={control}
                  rules={{ required: "Please select Lab" }}
                  render={({ field }) => (
                    <select
                      className="border p-1 rounded-md focus:border-gray-400 px-1 w-full focus:outline-none focus:ring-0"
                      {...field}
                    >
                      <option value="">Select a Lab</option>
                      {labs &&
                        labs.map((data) => (
                          <option key={data} value={data}>
                            {data}
                          </option>
                        ))}
                    </select>
                  )}
                />
                {errors.lab && (
                  <p className="text-red-500">{errors.lab.message}</p>
                )}
              </div>
              <div className="py-2">
                <span className="text-[#5C59E8] font-semibold">
                  Expense Type:{" "}
                </span>
                <Controller
                  id='category'
                  name="category"
                  control={control}
                  rules={{ required: "Please select Category Type" }}
                  render={({ field }) => (
                    <select
                      className="border p-1 rounded-md focus:border-gray-400 px-1 w-full focus:outline-none focus:ring-0"
                      {...field}
                      onChange={(e) =>{ 
                        field.onChange(e);
                        
                        }
                      }
                    >
                      <option value="">Select Expense</option>
                      <option value="Supplies">Supplies</option>
                      <option value="Repair">Repair</option>
                      <option value="External Services">External Servies</option>
                      <option value="Equipment">Equipments</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="basis-1/2 m-4 p-6 bg-[#EFEFFD]">
              <span className="text-xl font-bold text-indigo-600">
                Recommended Vendor Information:{" "}
              </span>
              <div className="py-2 ">
                <Controller
                  name="vendorName"
                  control={control}
                  rules={{ required: "Please select Vendor Name" }}
                  render={({ field }) => (
                    <select
                      className="border p-1 rounded-md focus:border-gray-400 px-1 w-full focus:outline-none focus:ring-0"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);

                        setSelectedVendorId(e.target.value);
                        console.log(selectedVendorId);
                      }}
                    >
                      <option value="">Select Vendor</option>
                      {vendors?.map((vendor, index) => (
                        <option key={index} value={vendor?._id}>
                          {vendor?.vendorName}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.vendorName && (
                  <p className="text-red-500">{errors.vendorName.message}</p>
                )}
              </div>
              <div className="py-2">
                <label className="text-[#5C59E8] font-semibold ">
                  Address:{" "}
                </label>

                <input
                  type="text"
                  // {...register("addrs", {
                  //   required: "Please select Address",
                  // })}
                  id="addrs"
                  className="border p-1 rounded-md focus:border-gray-400 px-1 w-full  focus:outline-none focus:ring-0 "
                  placeholder=" vedorAddress "
                  value={selectedVendor.registerAddress}
                />
                {errors.addrs && (
                  <p className="text-red-500">{errors.addrs.message}</p>
                )}
              </div>
              <div className="py-2 ">
                <label className="text-[#5C59E8] font-semibold">
                  Telephone No:{" "}
                </label>
                <input
                  type="text"
                  // {...register("contact", {
                  //   required: "Telephone is required",
                  // })}
                  id="contact"
                  className="border p-1 rounded-md focus:border-gray-400 px-1 w-full  focus:outline-none focus:ring-0 "
                  placeholder=" Telephone "
                  value={selectedVendor.mobileNumber}
                />
                {errors.contact && (
                  <p className="text-red-500">{errors.contact.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col p-4 border-2 rounded-md mt-4">
            <div className="text-xl font-medium p-2">Order Details</div>
            <form>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 p-2">
                  <label className="text-[#4D5464] font-medium">
                    Description
                  </label>
                  <input
                    name="description"
                    value={orderDetail.description}
                    onChange={handleInputChange}
                    className="p-2 border-2 rounded-md w-full text-[#4D5464]"
                    placeholder="Write Description"
                  />
                </div>
                <div className="flex flex-col w-1/2 p-2">
                  <label className="text-[#4D5464] font-medium">Quantity</label>
                  <input
                    name="quantity"
                    value={orderDetail.quantity}
                    onChange={handleInputChange}
                    className="p-2 border-2 rounded-md w-full text-[#4D5464]"
                    placeholder="Write Quantity"
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 p-2">
                  <label className="text-[#4D5464] font-medium">
                    Unit Price
                  </label>
                  <input
                    name="unitPrice"
                    value={orderDetail.unitPrice}
                    onChange={handleInputChange}
                    className="p-2 border-2 rounded-md w-full text-[#4D5464]"
                    placeholder="Enter the unit Price"
                  />
                </div>
                <div className="flex flex-col w-1/2 p-2">
                  <label className="text-[#4D5464] font-medium">Total</label>
                  <input
                    name="total"
                    value={orderDetail.total}
                    onChange={handleInputChange}
                    className="p-2 border-2 rounded-md w-full text-[#4D5464]"
                    placeholder="Enter the Total"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 p-4">{error}</p>}

              <button
                onClick={handleAddOrder}
                className="p-2 text-[#5C59E8] font-bold border-2 bg-[#DEDEFA] ml-2 mt-2 rounded-lg"
              >
                + Add Order
              </button>
            </form>
          </div>
        </div>

        <div className="p-2 border-2 rounded-md mt-4">
          <div className="text-xl font-medium p-2">Orders</div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-[#F9F9FC] ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {totalOrders.map((items, index) => (
                  <tr key={index} className="bg-white border-b text-center">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 flex flex-wrap">
                      {items.description}
                    </td>
                    <td className="px-6 py-4">{items.quantity}</td>
                    <td className="px-6 py-4">{items.unitPrice}</td>
                    <td className="px-6 py-4">{items.total}</td>
                    <td>
                      <button onClick={() => handleDelete(index)}>
                        <DeleteIcon />{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pt-6 mt-4">
          <div className="text-xl text-[#5C59E8] font-bold pl-2 ">Note</div>
          <div className="px-4">
            <h1 className="font-bold text-lg text-[#5E6366]">
              1. Complete the information and obtain approvals above,Form that
              are not approved or incomplete will be returned to the
              requistioner.
            </h1>
            <h1 className="font-bold text-lg text-[#5E6366]">
              2. Requisioner should attach minimum 3 Quotation of Supplier along
              with comparison with comparison chart.
            </h1>
          </div>
        </div>

        <div className="pt-6  mt-6 h-[200px]">
          <div className="border-2  pl-2 flex flex-col h-full  rounded-md min-w-full ">
            <label
              
              className="text-xl text-[#5C59E8] font-bold "
            >
              Remark
            </label>
            <input
            onChange={(e) => handleRemarks(e.target.value)}
              placeholder="Remarks"
              className=" bg-transparent  p-2  m-2"
            ></input>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="p-2 text-white px-8 font-bold border-2 bg-[#5C59E8] ml-2 mt-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default RequisitionForm;
