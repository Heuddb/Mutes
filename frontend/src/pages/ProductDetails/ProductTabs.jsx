import React, { useState } from "react";
import { Star } from "lucide-react";
import { reviews, shippingInfo } from "./constants";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-20 border-t border-gray-200">
      <nav className="flex space-x-12 pt-8">
        {["Description", "Reviews", "Shipping"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-3 text-sm tracking-wide transition-colors ${
              activeTab === tab.toLowerCase()
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      <div className="mt-8 pb-12">
        {activeTab === "description" && (
          <div className="max-w-3xl">
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Premium fabric blend for maximum comfort</p>
              <p>• Modern flare design for a trendy look</p>
              <p>• High-waisted fit for a flattering silhouette</p>
              <p>• Machine washable for easy care</p>
              <p>• Available in multiple colors and sizes</p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-3xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h3 className="text-lg font-serif">Customer Reviews</h3>
              <button className="border border-gray-900 px-6 py-2 text-sm tracking-wide hover:bg-gray-900 hover:text-white transition-colors w-full sm:w-auto">
                WRITE A REVIEW
              </button>
            </div>
            <div className="space-y-8">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 pb-8 last:border-0"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {review.date}
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "fill-gray-900 text-gray-900"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="max-w-3xl space-y-6 text-sm text-gray-600">
            {shippingInfo.map((info, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-gray-900 mb-2">
                  {info.title}
                </h4>
                <p>{info.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;