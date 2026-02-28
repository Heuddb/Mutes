import React, { useState } from "react";
import {
  Copy,
  Check,
  Tag,
  Clock,
  Percent,
  Calendar,
  Users,
  Sparkles,
  Award,
} from "lucide-react";

const CouponPage = () => {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const couponData = [
    {
      id: 1,
      code: "WELCOME50",
      discount: "50% OFF",
      title: "Welcome Discount",
      description: "Get 50% off on your first order. Minimum purchase ₹999.",
      expiry: "2024-12-31",
      minPurchase: 999,
      category: "New Customers",
      isPremium: true,
      usedCount: 1245,
    },
    {
      id: 2,
      code: "BLACK25",
      discount: "₹500 OFF",
      title: "Black Collection",
      description: "Flat ₹500 off on orders above ₹1999.",
      expiry: "2024-12-20",
      minPurchase: 1999,
      category: "Fashion",
      isPremium: false,
      usedCount: 892,
    },
    {
      id: 3,
      code: "MINIMAL30",
      discount: "30% OFF",
      title: "Minimalist Style",
      description: "30% off on minimalist clothing collection.",
      expiry: "2024-12-25",
      minPurchase: 1499,
      category: "Fashion",
      isPremium: false,
      usedCount: 2341,
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);

    
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* How to Use - Elegant */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-px bg-gray-300"></div>
            <span className="px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
              How to use
            </span>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gray-200"></div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Copy",
                  desc: "Select and copy coupon code",
                },
                {
                  step: "2",
                  title: "Add to Cart",
                  desc: "Shop and add items to cart",
                },
                { step: "3", title: "Apply", desc: "Use code during checkout" },
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="w-12 h-12 mx-auto mb-6 bg-white border-1 border-black rounded-full flex items-center justify-center relative z-10">
                    <span className="text-xl font-semibold text-black">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-light text-black mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Coupons Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-black">
                Available Coupons
              </h2>
              <p className="text-gray-600 mt-1">
                {couponData.length} codes available
              </p>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              Premium codes marked
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {couponData.map((coupon) => {
              const daysLeft = calculateDaysLeft(coupon.expiry);

              return (
                <div
                  key={coupon.id}
                  className={`relative border ${
                    coupon.isPremium ? "border-black" : "border-gray-300"
                  } bg-white group hover:shadow-lg transition-all duration-300 overflow-hidden`}
                >
                  
                  {/* Coupon Corner Cut */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[48px] border-l-transparent border-t-[48px] border-t-gray-100"></div>
                  </div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold">
                            {coupon.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-black">
                          {coupon.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            coupon.isPremium ? "text-black" : "text-gray-800"
                          }`}
                        >
                          {coupon.discount}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                      {coupon.description}
                    </p>

                    {/* Code Section - Minimal */}
                    <div className="mb-8">
                      <div className="relative">
                        <div className="border border-dashed border-gray-400 p-4 bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Tag className="w-4 h-4 text-gray-500 mr-2" />
                              <code className="text-xl font-mono font-bold tracking-wider text-black">
                                {coupon.code}
                              </code>
                            </div>
                            <button
                              onClick={() => copyToClipboard(coupon.code)}
                              className={`flex items-center gap-2 px-4 py-2 border text-sm font-medium transition-all duration-300 ${
                                copiedCoupon === coupon.code
                                  ? "border-green-600 text-green-600"
                                  : "border-black text-black hover:bg-black hover:text-white"
                              }`}
                            >
                              {copiedCoupon === coupon.code ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-3.5 h-3.5 mr-2" />
                          <span>Expires</span>
                        </div>
                        <div
                          className={`font-medium`}
                        >
                          {formatDate(coupon.expiry)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-gray-500">
                          <Percent className="w-3.5 h-3.5 mr-2" />
                          <span>Min. Purchase</span>
                        </div>
                        <div className="font-medium text-black">
                          {coupon.minPurchase === 0
                            ? "No Minimum"
                            : `₹${coupon.minPurchase}`}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-3.5 h-3.5 mr-2" />
                          <span>Days Left</span>
                        </div>
                        <div
                          className={`font-medium`}
                        >
                          {daysLeft} {daysLeft === 1 ? "day" : "days"}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-gray-500">
                          <Users className="w-3.5 h-3.5 mr-2" />
                          <span>Used</span>
                        </div>
                        <div className="font-medium text-black">
                          {coupon.usedCount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay Effect */}
                  <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terms - Minimal */}
        <div className="border-t border-gray-200 pt-12 mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-px bg-gray-300"></div>
            <span className="px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
              Terms
            </span>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1">
                      One per order
                    </h4>
                    <p className="text-sm text-gray-600">
                      Only one coupon can be applied per transaction
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1">
                      Non-transferable
                    </h4>
                    <p className="text-sm text-gray-600">
                      Coupons are tied to your account
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1">
                      Select items
                    </h4>
                    <p className="text-sm text-gray-600">
                      Some coupons apply to specific collections only
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1">
                      No cash value
                    </h4>
                    <p className="text-sm text-gray-600">
                      Coupons have no monetary value
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
