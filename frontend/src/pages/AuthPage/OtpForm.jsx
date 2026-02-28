import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../Redux/Slices/authSlice";
import { useVerifyOtpMutation } from "../../Redux/Api/auth/authApiSlice";
import toast  from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Resend from "../../components/Resend";

const OtpForm = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRef = useRef([]);
  const [verifyOtp, {isLoading,isError,isSuccess}] = useVerifyOtpMutation();
  const email = useSelector((state) => state.auth.pendingEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnchange = (digit, index) => {
    if (!/^[0-9]?$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
   
    // Auto Focus
    if (digit && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const onkeyDownHandle = (key, index) => {
    if (key.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      let guestId = localStorage.getItem("guestId");
      console.log(email)
      let otp = finalOtp;
      const res = await verifyOtp({ email, otp , guestId:guestId}).unwrap();
      console.log("resposne : ", res)

      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
        })
      );

      console.log(res.user.userId);

      localStorage.setItem("token",res.token);
      localStorage.setItem("user",JSON.stringify(res.user))
      localStorage.setItem("userId",res.user.userId)

      localStorage.removeItem("guestId");

      navigate("/");
    } catch (err) {
    console.error('OTP verification error:', err);
    
    if (err.data?.message) {
      toast.error(err.data.message);
    } else if (err.error?.data?.message) {
      toast.error(err.error.data.message);
    } else {
      toast.error("OTP verification failed. Please try again.");
    }
  }
};

  useEffect(()=>{
    if(isSuccess){
      toast.success("OTP verified successfully");
      navigate("/");
    }

  },[isSuccess])


  return (
    <div className="my-8 bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Heading */}
          <div className="mb-12">
            <div className="text-2xl">Enter Verification Code</div>
            <div className="text-gray-500 mt-2">
              We sent a 6-digit code to your email
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleFormSubmit}>
            {/* OTP Inputs */}
            <div className="space-y-4">
              <div className="text-sm mb-2">Enter 6-digit code</div>

              <div className="flex justify-between gap-4">
                {otp.map((digit, index) => (
                  <input
                    type="text"
                    key={index}
                    value={digit}
                    ref={(el) => (inputRef.current[index] = el)}
                    onChange={(e) => handleOnchange(e.target.value, index)}
                    onKeyDown={(e) => onkeyDownHandle(e, index)}
                    inputMode="numeric"
                    maxLength="1"
                    autoFocus={index === 0}
                    className="w-full py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black text-center text-xl font-medium"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer bg-black text-white py-4 hover:bg-gray-800"
              >
                {isLoading ? <ClipLoader color="#ffffff" size={25}/>:"Verify & Continue"}
                
              </button>
            </div>

            {/* Resend OTP */}
          <Resend/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
