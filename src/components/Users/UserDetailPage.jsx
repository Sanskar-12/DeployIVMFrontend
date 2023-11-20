import headerImg from './assests/ellipse.svg'; 
import noProfile from './assests/no-profile.svg'
import { useForm , Controller} from "react-hook-form";


const roles=[
    "Initiator",
    "Approver",
    "Verifier",
    "Institute Superuser"
]

const UserDetailPage = () => {

    const handleFormSubmit=(data)=>{

        console.log(data);
        reset()
    }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div>
    <div className="w-full h-full  bg-cover bg-center relative" style={{ backgroundImage: `url(${headerImg})` }}>
      <div className='flex flex-col justify-center items-center p-10'>
        < img className='  rounded-full w-44 h-44'  src={noProfile}/>
        <div className='p-3 text-lg font-bold text-white'>Add USER</div>
      </div>
    </div>
    <div className='p-6'></div>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
    <div className='flex flex-col w-full p-4  border-2 rounded-md bg-white'>
          <div className='py-2 text-lg font-semibold'>User Details</div>
          <div>

          <div className='flex flex-row'>
            <div className='w-1/2 mr-2'>
            <div className='py-2'>
            <div className='text-[#4D5464] font-semibold py-2'>Username : </div>
            <div  className='border-2 rounded-md '>
              <input 
              {...register("username", {
                required: "Username is required",
              })}
              id="username"
              type='text ' className='text-[#858D9D] bg-[#F9F9FC]  w-full p-2' placeholder='Enter the Username'></input>
              
              
            </div>
            {errors.username&& (
                  <p className="text-red-500">
                    {errors.username.message}
                  </p>
              )}
          </div>
            </div>
            <div className='w-1/2 mx-2'>
            <div className='py-2'>
            <div className='text-[#4D5464] font-semibold py-2'>Full Name : </div>
            <div  className='border-2 rounded-md '>
              <input
                {...register("full_name", {
                  required: "Full Name is required",
                })}
                id="full_name"
               type='text ' className='text-[#858D9D] bg-[#F9F9FC]  w-full p-2' placeholder='Enter Full Name '></input>
               
            </div>
            {errors.full_name&& (
                  <p className="text-red-500">
                    {errors.full_name.message}
                  </p>
              )}
          </div>
            </div>
          </div>
          <div className='flex flex-row '>
            <div className='w-1/2  mr-2 '>
            <div className='py-2'>
            <div className='text-[#4D5464] font-semibold py-2'>Department : </div>
            <div  className='border-2 rounded-md '>
              <input
              {...register("department", {
                required: "Department is required",
              })}
              id="department"
              type='text ' className='text-[#858D9D] bg-[#F9F9FC]  w-full p-2' placeholder='Enter Department'></input>
              
            </div>
            {errors.department&& (
                  <p className="text-red-500">
                    {errors.department.message}
                  </p>
              )}
          </div>
            </div>
            <div className='w-1/2 mx-2 '>
            <div className='py-2'>
            <div className='text-[#4D5464] font-semibold py-2'>Role : </div>
            <div  className='border-2 rounded-md '>
              {/* <input
               {...register("role", {
                required: "Role required",
              })}
              id="role"
              type='text ' class='text-[#858D9D] bg-[#F9F9FC]  w-full p-2' placeholder='Enter the role of User'>

              </input> */}
            <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Please select Role" }}
                  render={({ field }) => (
                    <select
                      className="text-[#858D9D] bg-[#F9F9FC]  w-full p-2"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <option value="">Select Role</option>
                      {roles?.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  )}
                />
            </div>
            {errors.role&& (
                  <p className="text-red-500">
                    {errors.role.message}
                  </p>
              )}
          </div>
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='w-1/2  mr-2'>
            <div className='py-2'>
            <div className='text-[#4D5464] font-semibold py-2'>Staff Designation : </div>
            <div  className='border-2 rounded-md '>
              <input
               {...register("staff_designation", {
                required: "Staff Designation required",
              })}
              id="staff_designation"
               type='text ' className='text-[#858D9D] bg-[#F9F9FC]  w-full p-2' placeholder='Enter the Staff Designation '></input>
         
            </div>
            {errors.staff_designation&& (
                  <p className="text-red-500">
                    {errors.staff_designation.message}
                  </p>
              )}
          </div>
            </div>
            <div className='w-1/2 mx-2'>
            <div className='py-2'>
            <div className='text-[#4D5464] font-semibold py-2'>Password : </div>
            <div  className='border-2 rounded-md '>
              <input 
               {...register("password", {
                required: "Password is required",
              })}
              id="password"
              type='text ' className='text-[#858D9D] bg-[#F9F9FC]  w-full p-2' placeholder='Enter Password'></input>
              
            </div>
            {errors.password&& (
                  <p className="text-red-500">
                    {errors.password.message}
                  </p>
              )}
          </div>
            </div>
          </div>
          <div className='flex space-x-3'>
            <button type='submit'  className="p-2 text-[#0D894F] font-semibold  bg-[#E7F4EE]  mt-2 rounded-lg">
              Update
            </button>
            <button 
            onClick={(e)=>{
                e.preventDefault()
                reset()}
            } 
            className="p-2 text-[#D64D4D] font-semibold  bg-[#FEEDEC]  mt-2 rounded-lg">
              Reset
            </button>
          </div>
          </div>

    </div>
    <div className='p-6'>

    </div>

    </form>



    </div>

  );
};

export default UserDetailPage;
