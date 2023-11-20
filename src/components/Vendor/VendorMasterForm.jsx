import {useForm} from 'react-hook-form';
import { createVendorAction } from '../../Actions/vendorActions';
import {useDispatch} from "react-redux"

const VendorMasterForm = () => {

  const dispatch=useDispatch()
  const{register,handleSubmit,reset} = useForm();
  const handleFormSubmit=(data)=>{
    const file = data.sign[0];
  const reader = new FileReader();

  reader.onload = () => {
    data.sign = reader.result;
    //setSelectedFile(file);
    console.log('File read complete');
    // Now, after the file is read, dispatch the action
    dispatch(createVendorAction(data));
    reset();
  };

  // Start reading the file
  reader.readAsDataURL(file);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mx-4 mt-4 border">
          <div className="w-full bg-[#EFEFFD] px-2 py-2 font-semibold text-lg">
          <span>Vendor Master Form</span>
          </div>       
        <div className="border">
        <table className="table w-full font-medium text-gray-500 text-sm">
        <thead>
          <tr >
          <th className="py-3 ">Sr. no</th>
          <th className="px-20 text-justify justify-start">Particulars</th>
          <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border">
           <td className="py-3 text-center">1</td>
           <td className="px-20">Name of company</td>
           <td className="w-1/2 px-3" ><input type="text" {...register("companyName")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">2</td>
           <td className="px-20">Registerd address</td>
           <td className="w-1/2 px-3"><input type="text" {...register("registerAddress")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">3</td>
           <td className="px-20">Place of billing address</td>
           <td className="w-1/2 px-3"><input type="text" {...register("billingaddress")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">4</td>
           <td className="px-20">Status of organization</td>
           <td className="w-1/2 px-3"><input type="text" {...register("organizationStatus")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">5</td>
           <td className="px-20">Contact person</td>
           <td className="w-1/2 px-3"><input type="text" {...register("contactPerson")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">6</td>
           <td className="px-20">Contact no.(Office)</td>
           <td className="w-1/2 px-3"><input type="text" {...register("officeNumber")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">7</td>
           <td className="px-20">Email ID</td>
           <td className="w-1/2 px-3"><input type="text" {...register("email")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">8</td>
           <td className="px-20">Contact no.(mobile)</td>
           <td className="w-1/2 px-3"><input type="text" {...register("mobileNumber")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">9</td>
           <td className="px-20">Date of formation</td>
           <td className="w-1/2 px-3"><input type="text" {...register("formationDate")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">10</td>
           <td className="px-20">PAN No.</td>
           <td className="w-1/2 px-3"><input type="text" {...register("panNumber")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">11</td>
           <td className="px-20">TAN Number</td>
           <td className="w-1/2 px-3"><input type="text" {...register("tanNumber")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
          <tr className="bg-white border">
           <td className="py-3 text-center">12</td>
           <td className="px-20">GST No.</td>
           <td className="w-1/2 px-3"><input type="text" {...register("gstNumber")} className="border p-1 rounded-md focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input></td>
          </tr>
         </tbody>
        </table>
        </div>
      </div>
      <div className="border mt-2 mx-4 rounded-lg bg-white">
        <span className="mx-4 my-4 text-lg font-semibold ">Vendor</span>
        <div className="mx-4 mt-4">
        <label className="text-[#4D5464] font-semibold">Name</label>
        <input type="text" {...register("vendorname")} className="border p-1 rounded-md text-[#858D9D] focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input>
        </div>
        <div className="mx-4 my-2">
        <label className="text-[#4D5464] font-semibold ">Designation</label>
        <input type="text" {...register("designation")} className="border p-1 rounded-md text-[#858D9D] focus:border-gray-400 px-1  w-full  focus:outline-none focus:ring-0 "></input> 
        </div>
        <div className="flex flex-col mx-4 my-2">
          <label className="text-[#4D5464] font-semibold ">Signature with Stamp </label>
          <div className='flex items-center justify-center  border outline-dashed outline-2 outline-offset-1'>
          <input type="file" {...register("sign")} placeholder='Upload image' className="py-10 text-blue-600"></input>

          </div>
        </div>
       
        </div>
        <div className="flex justify-end mx-20 py-5">
          <button type="submit" className="bg-[#5C59E8] hover:bg-blue-700 rounded py-1 px-5 text-white">Submit</button>
        </div>
        </form>
    </div>
  )
}

export default VendorMasterForm