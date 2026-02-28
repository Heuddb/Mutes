import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAddWishlistMutation } from "../Redux/Api/wishlist/WishListApiSlice";
import toast from 'react-hot-toast';
import { useAddToCartMutation } from "../Redux/Api/cart/cartApiSlice";

export default function ProductCard({ product }) {
  const [isFavorited, setIsFavorited] = useState(false);
  if (!product) return null;

  // Calculate discount percentage
  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  // Use first image from images array
  const mainImage = product.images?.[0] || "";

  // Handle out of stock
  const isOutOfStock = product.stock === 0;

  const [addWishlist, { isError }] = useAddWishlistMutation();
  const [addToCart,{isLoading,isSuccess,isError:isCartError}]= useAddToCartMutation();


  const addToCartHandler = async () => {
    const data = {
      productId:product._id,
      quantity:product.quantity || 1,
      size:product.size || "S",
      price:product.discountPrice,
    }
    try{
      await addToCart(data).unwrap();
      toast.success("Product added to cart");

    }catch(error){
      
      console.log(error.data)
    }
  }


  const wishListHandler = async () => {
    try {
      await addWishlist(product._id);
      toast.success("Product added to wishlist");
      setIsFavorited(true);
    } catch (err) {
      console.log(err.message);
      console.log(isError);
    }
  };


  return (
    <div
      className={`group w-full max-w-[300px] cursor-pointer mx-auto my-4 ${isOutOfStock ? "opacity-70" : ""}`}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-gray-50 
                      w-full 
                      h-[270px] sm:h-[300px] md:h-[330px] 
                      "
      >
        <Link to={`/product-details/${product._id}`}>
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? "grayscale" : ""}`}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </Link>

        {/* Favorite Button */}
        <button
          onClick={wishListHandler}
          className="cursor-pointer absolute top-3 right-3 bg-white p-1.5 rounded-full 
                     opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100 
                     shadow-md hover:shadow-lg"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFavorited
                ? "fill-black text-black"
                : "text-black hover:fill-black"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         bg-black/80 text-white text-sm font-bold px-3 py-1.5 rounded"
          >
            OUT OF STOCK
          </div>
        )}

        {/* Gender Badge */}
        {product.attributes?.gender && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {product.attributes.gender}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2.5 mt-3">
        {/* Category and Brand */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-gray-700 tracking-wider uppercase">
            {product.category}
          </span>
          {product.brand && (
            <span className="text-xs text-gray-600 italic">
              {product.brand}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 text-sm sm:text-base">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1.5">
          <div className="flex items-center space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.ratings?.average || 0)
                    ? "fill-black text-black"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">
            ({product.ratings?.count || 0})
          </span>
        </div>

        {/* Attributes (Size/Color) */}
        {(product.attributes?.size?.length > 0 ||
          product.attributes?.color?.length > 0) && (
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            {product.attributes?.size?.length > 0 && (
              <span>Sizes: {product.attributes.size.join(", ")}</span>
            )}
            {product.attributes?.color?.length > 0 && (
              <span>Colors: {product.attributes.color.join(", ")}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-baseline space-x-2">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-black">
                  ₹{product.discountPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-black">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add */}
        <button
          onClick={addToCartHandler}
          className={`w-full border-1 border-black text-black py-2 
                     text-xs font-bold  
                     transition-all duration-300
                     opacity-0 group-hover:opacity-100
                     ${
                       isOutOfStock
                         ? "bg-gray-300 cursor-not-allowed border-gray-300"
                         : "hover:bg-black hover:text-white"
                     }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "OUT OF STOCK" : "QUICK ADD"}
        </button>
      </div>
    </div>
  );
}
