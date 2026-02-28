import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAddWishlistMutation, useGetWishlistQuery } from "../../../Redux/Api/wishlist/WishListApiSlice";
import toast from 'react-hot-toast';
const ProductCard = ({ product }) => {
    let [addWishlist] = useAddWishlistMutation();
    let {data} = useGetWishlistQuery();
    let isFavorited = data?.products.some((item)=> item._id === product._id);

    const handleAddToWishlist = async () => {
        try{
        await addWishlist(product._id).unwrap();
        toast.success("Product added to wishlist");
        }catch(error){
            toast.error(error.data.message)
        }
    }
  return (
    <div className="group flex flex-col">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50 mb-4 aspect-[3/4]">
        <Link to={`/product-details/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
          />
        </Link>
        
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button onClick={handleAddToWishlist}
                    className="cursor-pointer absolute top-3 right-3 bg-white p-1.5 rounded-full 
                               opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100 
                               shadow-md hover:shadow-lg"
                  >
                    <Heart className={`w-4 h-4 transition-all ${isFavorited ? "fill-black text-black": "text-black hover:fill-black"
                      }`}
                    />
                  </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3 flex-1">
        <h3 className="text-xs font-bold text-black uppercase tracking-wide">
          {product.name}
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-black">
            ₹{product.discountPrice?.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{product.price?.toLocaleString()}
          </span>
        </div>
      </div>


    </div>
  );
};

export default ProductCard;