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



export default function NewProducts() {

  const [activeFilter,setActiveFilter] = useState("New")
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const {data,isLoading}=useGetAllProductsQuery();
  const productData = data?.filter(product=>product.condition?.toLowerCase()===activeFilter.toLowerCase()) || [];
 
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loader />
      </div>
    )
  }
 

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
     
      <div className="text-center my-8 playfair-display">
        <h2 className="text-3xl inline-block relative pb-1.5 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-28 after:h-[1px] after:bg-black">
        New Products
        </h2>
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
          {productData.map((product) => (
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