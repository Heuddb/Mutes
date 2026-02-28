const express = require('express');
const { postLogin, postSignUp, postOtpVerification, Logout, PostResend } = require('../controller/Auth');
const { SignupValidation, LoginValidation, OtpValidation } = require('../middleware/AuthValidation');

const auth = express.Router();

auth.post('/auth/login', LoginValidation, postLogin);
auth.post('/auth/signup', SignupValidation, postSignUp);
auth.post('/auth/verify-otp',OtpValidation , postOtpVerification);
auth.post('/auth/resend-otp',PostResend);
auth.post("/auth/logout",Logout);
 
module.exports = auth; 