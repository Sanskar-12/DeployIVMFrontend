import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const type=[
  "type 1",
  "type 2",
  "type 3",
  "type 4",
  "type 5"
]

const category=[
  "category 1",
  "category 2",
  "category 3",
  "category 4",
  "category 5"
]

const location=[
  "location 1",
  "location 2",
  "location 3",
  "location 4",
  "location 5",
]

const AddInventory = () => {
  return (
    <>
    <form>
        <div className="">
          <div className=" text-2xl font-medium">Add Inventory</div>
          <div className="flex">
            <p className="flex text-base text-[#5C59E8] font-medium pr-2">
              Inventory 
            </p>
            <div className="text-[#667085]">
              <ChevronRightIcon />
            </div>
            <p className="flex text-base text-[#667085] font-medium pl-1">
              Add Inventory
            </p>
          </div>
        </div>
        <div className='p-4'></div>
        <div>
          <div className=' text-xl font-medium'>Inventory</div>
        </div>
        <div className='p-2'> </div>
        <div>
          <div className='flex flex-col w-full'>
          <div className='flex flex-row w-full'>
            
            <div className='w-1/2 mr-4'>
            <div className='text-[#4D5464] py-2 font-medium'>Type</div>
            <select className='w-full p-2 border rounded-md'>
              {
                type.map((data,index)=>(
                  <option className='text-[#667085]' key={index}>{data}</option>
                ))
              }
            </select>
            </div>
            <div className='w-1/2'>
            <div className='text-[#4D5464]  py-2 font-medium'>Category</div>
            <select className='w-full p-2 border rounded-md'>
              {
                category.map((data,index)=>(
                  <option className='text-[#667085]' key={index}>{data}</option>
                ))
              }
            </select>
            </div>

          </div>
          <div className='p-2'></div>
          <div className='flex flex-col w-full'>
            <div className='text-md py-2 text-[#4D5464] font-medium'>Name</div>
            <input type='text' placeholder='Name' className='text-[#667085] p-2 border rounded-md'></input>
          </div>
          <div className='p-2'></div>
          <div className='flex flex-row '>
          <div className='flex flex-col w-1/2 mr-4'>
            <div className='text-md py-2 text-[#4D5464] font-medium'>Inventory Id</div>
            <input type='text' placeholder='Inventory Id' className='text-[#667085] p-2 border rounded-md'></input>
          </div>
          <div className='flex flex-col w-1/2'>
            <div className='text-md py-2 text-[#4D5464] font-medium'>Quantity</div>
            <input type='text' placeholder='Quantity' className='text-[#667085] p-2 border rounded-md'></input>
          </div>
          </div>
          <div className='p-2'></div>
          <div className='flex flex-row '>
          <div className='flex flex-col w-1/2 mr-4'>
            <div className='text-md py-2 text-[#4D5464] font-medium'>Price</div>
            <input type='text' placeholder='Price' className='text-[#667085] p-2 border rounded-md'></input>
          </div>
          <div className='flex flex-col w-1/2'>
            <div className='text-md py-2 text-[#4D5464] font-medium'>Total</div>
            <input type='text' placeholder='Total' className='text-[#667085] p-2 border rounded-md'></input>
          </div>
          </div>
          <div className='p-2'></div>
          <div className='flex flex-row '>
          <div className='flex flex-col w-1/2 mr-4'>
            <div className='text-md py-2 text-[#4D5464] font-medium'>Location</div>
            <select className='p-2 border rounded-md'>
              {
                location.map((data,index)=>(
                  <option className='text-[#667085]' key={index}>{data}</option>
                ))
              }
            </select>           
            </div>
          <div className='flex flex-col w-1/2'>
            <div className='text-md py-2 text-[#4D5464] font-medium'>Auditor Name</div>
            <input type='text' placeholder='Auditor Name' className='text-[#667085] p-2 border rounded-md'></input>
          </div>
          </div>
          <div className='p-2'></div>
          <div className=' flex justify-end'>
            <button className=' font-semibold bg-[#5C59E8] px-6  text-white py-2 rounded-lg'>Submit</button>
          </div>
            <div className='p-2'></div>
          </div>
        </div>
    </form>
    </>
  )
}

export default AddInventory