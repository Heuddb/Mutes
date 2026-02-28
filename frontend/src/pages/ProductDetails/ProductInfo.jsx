import React from "react";
import { Star } from "lucide-react";
import ProductActions from "./ProductActions";
import { useAddToCartMutation } from "../../Redux/Api/cart/cartApiSlice";
import toast from "react-hot-toast";

const ProductInfo = ({ product, selectedSize, setSelectedSize, quantity, setQuantity, wishlistHandler, isWishlist }) => {
  let data = {
    productId:product._id,
    quantity,
    size:selectedSize,
    price:product.discountPrice
  }
const [addToCart,{isLoading,isSuccess,isError}]= useAddToCartMutation();

const addToCartHandler = async()=>{
  try{
    if(!selectedSize || selectedSize === undefined){ 
      return toast.error("please select size")
    }
    await addToCart(data).unwrap();
    toast.success("Product added to cart");
  }catch(error){
    toast.error(error.data.message)
  }
}
  return (
    <div className="space-y-6">
      {/* Product Title */}
      <h1 className="text-3xl font-serif text-gray-900">
        {product.name}
      </h1>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        <div className="flex text-gray-900 mr-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
      </div>

      {/* Brand, Reference, Condition */}
      <div className="text-sm text-gray-600 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="font-medium text-gray-900">Brand:</span>{" "}
            {product.brand}
          </div>
          <div>
            <span className="font-medium text-gray-900">Reference:</span>{" "}
            FSGE_4518
          </div>
          <div>
            <span className="font-medium text-gray-900">Condition:</span>{" "}
            {product.condition}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-gray-300 mb-8"></div>

      {/* Size Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-serif text-gray-900 mb-4">
          Size: 5
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.attributes?.size?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-2 border text-sm transition-colors ${
                selectedSize === size
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-900"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price and Delivery */}
      <div className="mb-8">
        <div className="text-3xl font-serif text-gray-900 mb-2">
          ₹{product.discountPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <div className="text-gray-600">Delivered within 2-3 days</div>
      </div>

      {/* Actions */}
      <ProductActions
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        wishlistHandler={wishlistHandler}
        isWishlist={isWishlist}
        addToCartHandler={addToCartHandler}
      />

      {/* Policies Section */}
      <div className="space-y-4 mb-8">
        <div className="text-sm">
          <div className="font-medium text-gray-900 mb-1">
            Security policy
          </div>
          <div className="text-gray-600">
            (edit with the Customer Reassurance module)
          </div>
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-900 mb-1">
            Delivery policy
          </div>
          <div className="text-gray-600">
            (edit with the Customer Reassurance module)
          </div>
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-900 mb-1">
            Return policy
          </div>
          <div className="text-gray-600">
            (edit with the Customer Reassurance module)
          </div>
        </div>
      </div>

      {/* Guarantee Safe Checkout */}
      <div className="border-t border-gray-300 pt-8">
        <h3 className="text-lg font-serif text-gray-900 mb-6">
          Guarantee safe checkout
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {["Visa", "MasterCard", "PayPal", "Apple Pay"].map((method) => (
            <div
              key={method}
              className="h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 font-medium"
            >
              {method}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;