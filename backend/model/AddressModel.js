const mongoose = require("mongoose");

const singleAddressSchema = new mongoose.Schema(
  {
    addressType: {
      type: String,
      enum: ["Home", "Office"],
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },

    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid pincode"],
    },

    Address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    town: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },

    addresses: [singleAddressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
