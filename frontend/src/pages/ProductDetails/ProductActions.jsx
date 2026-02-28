import React from "react";
import { Minus, Plus, ShoppingCart, Share2, Twitter, Facebook, Instagram } from "lucide-react";

const ProductActions = ({ product, quantity, setQuantity, wishlistHandler, isWishlist , addToCartHandler}) => {
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share cancelled", err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          {/* Quantity */}
          <div className="flex items-center border border-gray-300 w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button onClick={addToCartHandler} className="cursor-pointer flex-1 bg-gray-900 text-white py-3 px-8 text-sm font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto">
            <ShoppingCart className="inline-block w-5 h-5 mr-2" />
            ADD TO CART
          </button>
        </div>

        {/* Compare and Wishlist */}
        <div className="flex space-x-6">
          <button
            onClick={() => wishlistHandler(product._id)}
            className={`text-sm transition-colors cursor-pointer ${
              isWishlist ? "text-red-600" : "hover:text-gray-900"
            }`}
          >
            {isWishlist ? "ALREADY IN WISHLIST" : "ADD TO WISHLIST"}
          </button>
        </div>
      </div>

      {/* Share Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">Share</span>
          <button
            onClick={handleShare}
            className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-blue-400 transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-blue-600 transition-colors">
            <Facebook className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-pink-500 transition-colors">
            <Instagram className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductActions;