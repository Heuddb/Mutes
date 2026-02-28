import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetAllProductsQuery } from "../Redux/Api/products/productsApi";
import Loader from "./Loader";
export default function ShopByCategory() {
  // default to FASHION so the slider doesn't appear empty on load; special logic below
  const [activeFilter, setActiveFilter] = useState("FASHION");
  const [active, setActive] = useState("FASHION");
  const { data: products = [], isLoading } = useGetAllProductsQuery();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
 

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px3 lg:px-8 py-8">
        <Loader />
      </div>
    )
  }

  // Filter products based on category (case-insensitive)
  // 'FASHION' is a virtual category representing any apparel (men or women)
  const filteredProducts = products.filter((product) => {
    if (!activeFilter) return true;
    if (!product.category) return false;
    const cat = product.category.toLowerCase();
    const filter = activeFilter.toLowerCase();
    if (filter === "fashion") {
      return cat === "women" || cat === "men" || cat === "fashion";
    }
    return cat === filter;
  });


  
  const categoryHandel = (states)=>{
    setActive(states);
    setActiveFilter(states);

  }
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px3 lg:px-8 py-8">
      {/* Header */}
    <div className="text-center my-8 playfair-display">
        <h2 className="text-3xl inline-block relative pb-1.5 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-40 after:h-[2px] after:bg-black">
          Shop By Category
        </h2>
      </div>

      <div className="w-full py-5 px-4">
        <div className="flex justify-center items-center gap-10 sm:overflow-auto ">

          <div
            onClick={() => categoryHandel("FASHION")}
            className={`${
              active=== "FASHION" ? 'bg-black text-white' : 'border border-black'
            } cursor-pointer hover:bg-black hover:text-white transition-all w-[140px] h-[44px] flex justify-center items-center`}
          >
            FASHION
          </div>

          <div
            
            onClick={() => categoryHandel("SHOES")}
            className={`${
              active=== "SHOES" ? 'bg-black text-white' : 'border border-black'
            } cursor-pointer hover:bg-black hover:text-white transition-all w-[140px] h-[44px] flex justify-center items-center`}
          >
            SHOES
          </div>

           <div
            onClick={() => categoryHandel("BAGS")}
            className={`${
              active==="BAGS" ? 'bg-black text-white' : 'border border-black'
            } cursor-pointer hover:bg-black hover:text-white transition-all w-[140px] h-[44px] flex justify-center items-center`}
          >
            BAGS
          </div>

        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          ref={navigationPrevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                   bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center
                   hover:bg-gray-50 transition-all duration-300 
                   border border-gray-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          ref={navigationNextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                   bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center
                   hover:bg-gray-50 transition-all duration-300
                   border border-gray-200"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="pb-12"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="py-2">
                <ProductCard 
                  product={product} // You'll need to modify ProductCard to accept a product prop
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}