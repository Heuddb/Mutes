const mongoose = require("mongoose");

const Otp = new mongoose.Schema(
  {
  email: { type: String, required: true },
  otp: { type: String, required: true },
  userData: { type: Object},
  expireAt: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", Otp);
