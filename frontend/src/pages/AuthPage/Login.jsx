import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setPendingEmail } from "../../Redux/Slices/authSlice";
import { useLoginMutation } from "../../Redux/Api/auth/authApiSlice";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email };
    try {
      await login(data).unwrap();
      dispatch(setPendingEmail(email));

  
    } catch (err) {
      console.log("Login error:", err);
      toast.error(err.data.message)
    }
  };

      useEffect(() => {
        if (isSuccess) {
          toast.success("otp sent to your email");
          navigate("/auth/verify-otp");
        }

        if (isError) {
          toast.error("Login Failed");
        }
      }, [isSuccess]);

  return (
    <div className="my-8 bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="mb-18">
            <div className="text-2xl ">Login with Email</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <div className="text-sm ">Email Address</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="w-full py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black"
                placeholder=""
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-black text-white py-4 hover:bg-gray-800"
              >
                {isLoading ? <ClipLoader color="#ffffff"size={25}/>:"Send Verification Code"}
                
              </button>
            </div>

            {/* Links */}
            <div className="text-center text-sm text-gray-500 pt-4">
              Already have an account?{" "}
              <NavLink to="/auth/sign-up" className="text-black underline">
                Sign up
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
