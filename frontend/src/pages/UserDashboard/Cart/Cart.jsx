import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useRemoveCartMutation,
} from "../../../Redux/Api/cart/cartApiSlice";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";

export const Cart = () => {
  const { data: cartData, isLoading } = useGetCartQuery();
  const [removeCart] = useRemoveCartMutation();
  const cartItem = cartData?.cartItem || [];

  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
 
  const taxRate = 0.08; // 8%
  const quantityOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Calculate totals
  const subtotal = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
   const shippingCost = subtotal > 2000 ? 50 : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const removeItem = async (id) => {
    try {
      await removeCart(id).unwrap;
      toast.success("item has removed from cart");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "MUTES10") {
      alert("Promo code applied! 10% discount added to your order.");
    } else if (promoCode.trim() !== "") {
      alert("Invalid promo code. Please try again.");
    }
    setPromoCode("");
  };

  const handleCheckout = () => {
    if(cartItem.length===0){
      return toast.error("Your cart is empty");
    }
    navigate("/checkout/address");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-3xl playfair-display inline-block relative pb-1.5 ">
            Cart
          </h2>
          <p className="text-gray-600">Premium fashion selection</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-50 text-gray-600 text-sm font-medium py-4 px-6 border-b border-gray-200">
                <div className="col-span-5">PRODUCT</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-center">TOTAL</div>
                <div className="col-span-1"></div>
              </div>

              {/* Cart Items */}
              {cartItem.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <NavLink
                    to="/"
                    className="inline-block bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition"
                  >
                    Continue Shopping
                  </NavLink>
                </div>
              ) : (
                cartItem.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:grid md:grid-cols-12 items-center py-6 px-4 md:px-6 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Product Info */}
                    <div className="col-span-5 flex items-center mb-4 md:mb-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-4">
                        <Link to={`/product-details/${item?.product._id}`}>
                          <img
                            src={item?.product.images[0]}
                            alt={item?.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          {item?.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">
                          {item.category}
                        </p>
                        <div className="flex text-sm text-gray-600">
                          <span className="mr-3">Size: {item?.size}</span>
                          <span>Color: {item?.product.attributes.color}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center mb-4 md:mb-0">
                      <span className="font-medium">
                        Rs.{item.price.toFixed(2)}
                      </span>
                    </div>
                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center mb-4 md:mb-0">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <select
                          name="quantity"
                          id="quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value),
                            )
                          }
                          className="w-16 h-8 text-center border-none focus:ring-0"
                        >
                          {quantityOption.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-center mb-4 md:mb-0">
                      <span className="font-medium">
                        Rs.{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove */}
                    <div className="col-span-1 flex justify-center md:justify-end">
                      <button
                        onClick={() => removeItem(item?.product._id)}
                        className="cursor-pointer text-gray-400 hover:text-gray-700 transition"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Continue Shopping & Update Cart */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
              <NavLink
                to="#"
                className="mb-4 sm:mb-0 text-gray-700 hover:text-black font-medium flex items-center"
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
                Continue Shopping
              </NavLink>
              <div className="flex space-x-4"></div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-32">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-gray-800 text-white px-4 py-2 rounded-r-md font-medium hover:bg-gray-900 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    Rs.{shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Rs.{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition mb-4">
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-200">
                <p className="mb-3">We accept</p>
                <div className="flex justify-center space-x-4">
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    VISA
                  </div>
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    MC
                  </div>
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    AMEX
                  </div>
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                    PP
                  </div>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium mb-1">Secure Shopping</h3>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure. We never
                    share your details with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
