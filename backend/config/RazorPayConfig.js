const Razorpay = require('razorpay')

 const razorPay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
});

module.exports = razorPay