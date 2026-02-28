const razorPay = require('../config/RazorPayConfig')
const crypto = require("crypto");
const OrdersModel = require("../model/OrdersModel");
const AddressModel = require("../model/AddressModel");
const CartModel = require("../model/CartModel");

let createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorPay.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

let verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      addressId,
      paymentMethod,
    } = req.body;

    const user = req.user?._id || req.user?.id;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res
        .status(400)
        .json({ message: "Missing required payment details" });
    }

    // Verify payment signature
    const signature = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(signature.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Payment verified successfully - now create the order
    const cart = await CartModel.findOne({ user }).populate("items.product");
    if (!cart || !cart.items.length) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const addressDoc = await AddressModel.findOne({ user });
    if (!addressDoc) {
      return res.status(404).json({ message: "Address not found" });
    }

    const selectedAddress = addressDoc.addresses.id(addressId);
    if (!selectedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    let totalAmount = 0;
    let orderItems = cart.items.map((items) => {
      totalAmount += items.price * items.quantity;
      return {
        product: items.product._id,
        name: items.product.name,
        image: items.product.images[0],
        size: items.size,
        quantity: items.quantity,
        price: items.price
      };
    });

    let shippingCharges = totalAmount > 2000 ? 50 : 0;
    let tax = totalAmount * 0.08;
    let totalPayableAmount = totalAmount + shippingCharges + tax;

    // Create order with PAID status
    let order = new OrdersModel({
      user,
      orderId: `ORD-${Date.now()}`,
      items: orderItems,
      shippingAddress: {
        fullName: selectedAddress.fullName,
        mobile: selectedAddress.mobile,
        Address: selectedAddress.Address,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
      },
      paymentMethod,
      paymentStatus: "PAID",
      orderStatus: "PLACED",
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      pricing: {
        subtotal: totalAmount,
        shipping: shippingCharges,
        tax,
        total: totalPayableAmount,
      },
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      order
    });
  } catch (error) {
    console.error("verifyPayment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};


module.exports = {
  createRazorpayOrder,
  verifyPayment,
}