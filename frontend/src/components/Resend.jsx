import React, { useEffect, useState } from 'react'
import { useResendOtpMutation } from '../Redux/Api/auth/authApiSlice'
import {  useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Resend = () => {
    const [resendOtp,{isLoading}] = useResendOtpMutation();
    const email = useSelector(state=>state.auth.pendingEmail)
    const [timeLeft,setTimeLeft] = useState(120);


    useEffect(()=>{
      if(timeLeft === 0)return;

      const interval = setInterval(()=>{
        setTimeLeft((prev)=>prev-1);

      },1000)

      return ()=>clearInterval(interval);

    },[timeLeft])

    const handleResend= async()=>{
      try{
        await resendOtp({email}).unwrap();
        toast.success("OTP resent successfully");
        setTimeLeft(120);

      }catch(error){
        toast.error(error.data.message);
        
      }

    }
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft%60;
  return (
    <>
    {/* Resend OTP */}
            <div className="text-center space-y-4">
              <div className="text-sm text-gray-500">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timeLeft>0 || isLoading}
                  className={timeLeft>0 || isLoading ? (`text-gray-400 cursor-not-allowed`):("text-black underline cursor-pointer")}
                >
                  {isLoading? "sending...":"Resend Code"}
                </button>
              </div>

              <div className="text-xs text-gray-400">
                 {timeLeft > 0
          ? `Resend available in ${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          : "You can resend the OTP now"}
              </div>
            </div>
      
    </>
  )
}

export default Resend
