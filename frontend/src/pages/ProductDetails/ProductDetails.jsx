import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Redux/Api/products/productsApi";
import {
  useAddWishlistMutation,
  useGetWishlistQuery,
} from "../../Redux/Api/wishlist/WishListApiSlice";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";


// Import Components
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState();
  const { id } = useParams();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const [addWishlist] = useAddWishlistMutation();
  const { data: wishlistData } = useGetWishlistQuery();
  
  const wishlistProducts = wishlistData?.products || [];
  const isWishlist = wishlistProducts.some(
    (item) => item._id === product?.products._id,
  );

  const wishlistHandler = async (id) => {
    try {
      await addWishlist(id).unwrap();
      toast.success("Item added to wishlist");
    } catch (error) {
      console.log(error.data)
      toast.error("Failed to add item. Please try again.");
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
     <BeatLoader
  margin={4}
  size={33}
/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load product
      </div>
    );
  }

  const productData = product?.products || {};
  const images = productData.images || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Product Section */}
      <div className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Left Side - Image Gallery */}
          <ProductGallery images={images} />

          {/* Right Side - Product Details - Made Sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hide">
            <ProductInfo
              product={productData}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              wishlistHandler={wishlistHandler}
              isWishlist={isWishlist}
            />
          </div>
        </div>

        {/* Tabs Section */}
        <ProductTabs product={productData} />

       
      </div>
    </div>
  );
};

export default ProductDetails;