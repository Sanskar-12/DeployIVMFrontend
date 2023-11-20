import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../Actions/userActions";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(username, password));
    // console.log(username, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      alert.success("Logged In");
      navigate("/home");
    }
  }, [navigate, isAuthenticated, alert]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [alert, error]);
  const id = sessionStorage.userId;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {id && <Navigate to="/home" replace={true}></Navigate>}
          <div className=" flex justify-center items-center h-screen bg-[#F1FAEE]">
            <div className="box-border h-[450px] w-[550px] rounded-[20px] drop-shadow-2xl bg-[#fff]">
              <div className=" justify-center pt-4">
                <p className="text-3xl font-bold text-[#1D3557]  leading-normal text-center">
                  WELCOME!
                </p>
                <p className="text-[#1D3557] font-[400] text-center">
                  LOG IN TO START YOUR SESSION
                </p>
              </div>

              <div className="flex justify-center pt-8">
                <form onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="block text-xl sm:text-sm font-medium text-center sm:text-left text-slate-700 ">
                      Username
                    </span>

                    <input
                      type="text"
                      placeholder="Enter valid username"
                      className="mt-1  flex align-center justify-center h-[4vh] w-[80vw] sm:w-[435px] px-3 py-2 bg-white border
             border-slate-300 rounded-md text-sm shadow-sm 
             disabled:bg-slate-50 disabled:text-slate-500 "
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="pt-5">
                      <span className="block text-xl sm:text-sm font-medium text-center sm:text-left text-slate-700 ">
                        Password
                      </span>

                      <input
                        type="password"
                        placeholder="Enter valid Password"
                        className="mt-1  flex align-center justify-center h-[4vh] w-[80vw] sm:w-[435px] px-3 py-2 bg-white border
            border-slate-300 rounded-md text-sm shadow-sm 
            disabled:bg-slate-50 disabled:text-slate-500 "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </label>

                  <div className="pt-10 mt-1 flex align-center justify-center">
                    <button
                      type="submit"
                      className="rounded-md   bg-[#1D3557] h-[4vh] w-[25vw] sm:h-[36px] sm:w-[435px]"
                    >
                      <p className="text-[#fff]">Login</p>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
