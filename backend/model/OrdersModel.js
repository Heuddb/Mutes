const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },

    canReview: { type: Boolean, default: false },
    isReviewed: { type: Boolean, default: false },

    isReturnable: { type: Boolean, default: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true, // ORD-XXXX
    },

    items: [orderItemSchema],

    shippingAddress: {
      fullName: String,
      mobile: String,
      Address: String,
      city: String,
      state: String,
      pincode: String,
      
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      enum: [
        "PLACED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
      default: "PLACED",
    },

    orderType: {
  type: String,
  enum: ["INTENT", "FINAL"],
  default: "FINAL",
},

    trackingId: { type: String },

    pricing: {
      subtotal: Number,
      shipping: Number,
      tax: Number,
      total: Number,
    },

    estimatedDelivery: Date,
    deliveredAt: Date,

    paymentInfo: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },
  },
  { timestamps: true },
);

module.exports=  mongoose.model("Order", orderSchema);
