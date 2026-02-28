import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetWishlistQuery, useMoveTocartMutation, useRemoveWishlistMutation } from "../../Redux/Api/wishlist/WishListApiSlice";
import { Star, X } from "lucide-react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const WishlistPage = () => {
  const [removingId, setRemovingId] = useState(null);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, isError } = useGetWishlistQuery();
  const [removeWishlist, { isLoading: loading }] = useRemoveWishlistMutation();
  const [moveTocart,{isSuccess,isError:error}] = useMoveTocartMutation();

  const wishlistItems = data?.products ?? [];

    const cartData = { // data that cart accept from api
    products: selectedProduct?._id,
    quantity,
    size:selectedSize,
    price:selectedProduct?.discountPrice

  }


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BeatLoader margin={4} size={33} />
      </div>
    );
  }

  const removeFromWishlist = async (id) => {
    try {
      setRemovingId(id);
      await removeWishlist(id).unwrap();
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Failed to remove item. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const openSizeModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize("");
    setQuantity(1);
    setIsSizeModalOpen(true);
    
  };

  const handleAddToCart = async () => {
    if (!selectedSize && selectedProduct?.attributes?.size?.length > 0) {
      toast.error("Please select a size");
      return;
    }
    console.log(cartData);

    try{
      
    await moveTocart(cartData).unwrap();
    toast.success("Item moved to cart");
   
    }catch(error){
      console.log(error.data)

    }
    setIsSizeModalOpen(false);
    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
    
  };

  const closeModal = () => {
    setIsSizeModalOpen(false);
    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      {/* Only Page Content - No Navbar or Footer */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <p className="text-3xl playfair-display md:text-3xl  mb-2">
                Wishlist
              </p>
              <p className="text-gray-600">Items saved for later</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="px-4 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        {wishlistItems.length <= 0 ? (
          <div className="bg-white p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">
                Save items you love for later. Click the heart icon on any item
                to add it here.
              </p>
              <Link
                to="/"
                className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* item Image */}
                <div className="relative">
                  <div className="h-90 bg-gray-100 overflow-hidden">
                    <NavLink to={`/product-details/${item._id}`}>
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </NavLink>
                  </div>

                  {/* Stock Status */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                      item.stock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.stock ? "In Stock" : "Out of Stock"}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="cursor-pointer absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                    aria-label="Remove from wishlist"
                    disabled={removingId === item._id}
                  >
                    {removingId === item._id && loading ? (
                      <ClipLoader color="#000000" size={25} />
                    ) : (
                      <X className="h-4 w-4 text-gray-600" />
                    )}
                  </button>

                  {/* Sale Badge */}
                  {item.originalPrice > item.price && (
                    <div className="absolute bottom-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium">
                      SAVE ${(item.originalPrice - item.price).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* item Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-medium mb-1">{item.name}</h3>
                    </div>
                  </div>

                  {/* Color & Size */}
                  {(item.attributes?.size?.length > 0 ||
                    item.attributes?.color?.length > 0) && (
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      {item.attributes?.size?.length > 0 && (
                        <span>Sizes: {item.attributes.size.join(", ")}</span>
                      )}
                      {item.attributes?.color?.length > 0 && (
                        <span>Colors: {item.attributes.color.join(", ")}</span>
                      )}
                    </div>
                  )}

                  {/* Rating - Changed to Black Stars */}
                  <div className="flex pt-2 items-center space-x-1.5">
                    <div className="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 ${
                            i < Math.floor(item.ratings?.average || 0)
                              ? "fill-black text-black"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                      ({item.ratings?.count || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1.5 py-1.5">
                    <div className="flex items-baseline space-x-2">
                      {item.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-black">
                            ₹{item.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-black">
                          ₹{item.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openSizeModal(item)}
                      disabled={!item.stock}
                      className={`flex-1 py-2 cursor-pointer font-medium transition ${
                        item.stock
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {item.stock ? "Move To Cart" : "Out of Stock"}
                    </button>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Size Selection Modal with Quantity Buttons */}
      {isSizeModalOpen && selectedProduct && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Modal Content */}
            <div
              className="bg-white rounded-lg max-w-lg w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b-[1px]">
                <h3 className="text-lg font-semibold">Select Size & Quantity</h3>
               
              </div>
              <div className="p-4">
                <p className="font-medium mb-4">{selectedProduct.name}</p>
                
                {/* Size Selection */}
                {selectedProduct.attributes?.size?.length > 0 ? (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Choose size:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.attributes.size.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-md transition ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : "bg-white text-gray-700 border-gray-300 hover:border-black"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">This item has no size options.</p>
                )}

                {/* Quantity Buttons */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Quantity (max 5):</p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setQuantity(num)}
                        className={`min-w-[50px] px-4 py-2 border rounded-md transition ${
                          quantity === num
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;