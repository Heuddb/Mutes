import React, { useState } from "react";

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex space-x-4">
      {/* Left Side - Small Thumbnails (Vertical) */}
      <div className="flex-shrink-0 w-20 space-y-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`w-full rounded-lg overflow-hidden border transition-all duration-200 ${
              selectedImage === idx
                ? "border-gray-900 border-2"
                : "border-gray-300 hover:border-gray-600"
            }`}
          >
            <img
              src={img}
              alt={`View ${idx + 1}`}
              className="w-full h-24 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Right Side - Large Main Image */}
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg overflow-hidden h-[600px]">
          <img
            src={images[selectedImage]}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;