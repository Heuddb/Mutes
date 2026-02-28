import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePrepareOrderMutation } from "../../Redux/Api/Orders/orderApi";
import { useGetAddressQuery } from "../../Redux/Api/Address/AddressApi";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useGetCartQuery } from "../../Redux/Api/cart/cartApiSlice";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "../../Redux/Api/razorpay/razorpayApi";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { data: cartData } = useGetCartQuery();
  const cartItems = cartData?.cartItem || [];

  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  
  const addressId = useSelector((state) => state.address.addressId);

  if (!addressId) {
    navigate("/checkout/address");
    return null;
  }

  // price calculation

  const taxRate = 0.08; // 8% tax
  // flat shipping fee

   const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shippingCost = subtotal > 2000 ? 50 : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + subtotal * taxRate;

  const [prepareOrder, { isLoading }] = usePrepareOrderMutation();
  const { data: addressData } = useGetAddressQuery();
  let shippingAddress = addressData?.addresses?.find(
    (addr) => addr._id.toString() === addressId.toString(),
  );

  if (isLoading || !shippingAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading payment details...
      </div>
    );
  }


  const handleCodPayment = async () => {
    try {
      await prepareOrder({
        addressId,
        paymentMethod: "COD",
      }).unwrap();

      toast.success("Order confirmed! Your order will be delivered soon.");

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      console.error("Error preparing COD order:", error);
      console.log(error.data);
    }
  };

const handlePayOnline = async () => {
  try {
    // 1️⃣ Create Razorpay order (amount in PAISE)
    const razorpayOrder = await createOrder({
      amount: total * 100,
    }).unwrap();

    // 2️⃣ Open Razorpay Checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: razorpayOrder.order.amount,
      currency: "INR",
      order_id: razorpayOrder.order.id,
      name: "MUTES",
      description: "Order Payment",

      handler: async (response) => {
        try {
          // 3️⃣ Verify payment & create order on backend
          await verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            addressId,
            paymentMethod: "UPI",
          }).unwrap();

          toast.success("Payment successful!");
          navigate("/orders");
        } catch (err) {
          console.log(err.data)
          toast.error("Payment verification failed");
        }
      },

      theme: { color: "#000000" },
    };

    new window.Razorpay(options).open();
  } catch (error) {
    console.error(error);
    toast.error(error?.data?.message || "Payment failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-black mb-4 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl playfair-display inline-block relative pb-1.5">
              Payment
            </h2>
          </div>
          <p className="text-gray-600 mt-2">Complete your payment</p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDE - Payment Options */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">
                Select Payment Method
              </h2>

              {/* Payment Methods */}
              <div className="space-y-4">
                {/* COD Option */}
                <label
                  className={`flex items-start p-5 border rounded-lg cursor-pointer transition ${
                    paymentMethod === "COD"
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black mt-1"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Pay with cash when your order is delivered
                    </p>

                    {/* COD Benefits */}
                    {paymentMethod === "COD" && (
                      <div className="mt-4 p-3 bg-gray-100 rounded-md">
                        <p className="text-xs text-gray-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          No additional charges
                        </p>
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <svg
                            className="w-4 h-4 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Pay only when you receive
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {/* UPI Option */}
                <label
                  className={`flex items-start p-5 border rounded-lg cursor-pointer transition ${
                    paymentMethod === "UPI"
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black mt-1"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        Pay Online
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Instant
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Pay using Google Pay, PhonePe, Paytm or any UPI app
                    </p>
                  </div>
                </label>
              </div>

              {/* Payment Button */}
              <div className="mt-8">
                <button
                  disabled={isLoading}
                  onClick={
                    paymentMethod === "COD" ? handleCodPayment : handlePayOnline
                  }
                  className={`cursor-pointer w-full py-3 rounded-md font-medium transition bg-black text-white hover:bg-gray-800`}
                >
                  {isLoading
                    ? <ClipLoader color="#ffffff"size={25}/>
                    : paymentMethod === "COD"
                      ? "Confirm Order"
                      : "Pay Online"}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By completing this payment, you agree to our
                  <button className="text-black underline ml-1">
                    Terms of Service
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Address */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-32">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">
                Delivery Address
              </h2>

              {/* Address Card */}
              <div className="bg-gray-50 rounded-lg p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium text-gray-900">
                      Shipping Address
                    </span>
                  </div>
                  <span className="text-xs bg-white text-gray-600 px-2 py-1 rounded border border-gray-200">
                    READ ONLY
                  </span>
                </div>

                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold text-lg">
                    {shippingAddress.fullName}
                  </p>
                  <p>{shippingAddress.Address}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.state}{" "}
                    {shippingAddress.pincode}
                  </p>
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {shippingAddress.mobile}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary Mini */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal {cartItems.length} items</span>
                    <span className="font-medium">Rs.{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Rs.{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">Rs.{(subtotal * taxRate).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-gray-200 text-base font-bold">
                    <span>Total</span>
                    <span>Rs.{(subtotal + shippingCost + subtotal * taxRate).toFixed(2)}</span>
                  </div>
                </div>
              </div>

   
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
