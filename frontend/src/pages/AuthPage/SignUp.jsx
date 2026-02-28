import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../Redux/Api/auth/authApiSlice";
import { setPendingEmail } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [updates, setUpdates] = useState(false);

  const dispatch = useDispatch();
  const [signup, { isLoading, isError, isSuccess }] = useSignUpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, terms, updates };
    await signup(data).unwrap();
    dispatch(setPendingEmail(email));
    navigate("/auth/verify-otp");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("otp sent to your email");
      navigate("/auth/verify-otp");
    }
    if (isError) {
      toast.error("Signup Failed");
    }
  }, [isSuccess, isError]);

  return (
    <div className="my-8 bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="mb-18">
            <div className="text-2xl ">Sign Up with Email</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <div className="text-sm ">Full Name</div>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="w-full py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black"
                placeholder=""
              />
            </div>

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

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 pt-2">
              <input
                onChange={(e) => setTerms(e.target.checked)}
                type="checkbox"
                id="acceptTerms"
                name="terms"
                className="mt-1"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-start gap-3">
              <input
                onChange={(e) => setUpdates(e.target.checked)}
                type="checkbox"
                id="receiveUpdates"
                name="updates"
                className="mt-1"
              />
              <label htmlFor="receiveUpdates" className="text-sm text-gray-700">
                {` I wish to receive updates and news on my email ${"(optional)"}`}
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="cursor-pointer w-full bg-black text-white py-4 hover:bg-gray-800"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={25} />
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </div>

            {/* Links */}
            <div className="text-center text-sm text-gray-500 pt-4">
              Already have an account?{" "}
              <NavLink to="/auth/login" className="text-black underline">
                Sign in
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
