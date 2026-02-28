import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";

const CmsBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Banner 1 */}
        <div className="relative overflow-hidden group">
          <img
            src={assets.banner1}
            alt="Classic Touch"
            className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bottom Content */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h2 className="text-2xl md:text-2xl font-semibold text-black">
              Classic Touch
            </h2>

            <button className="mt-2 flex items-center gap-2 text-sm font-medium uppercase underline underline-offset-4">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative overflow-hidden group">
          <img
            src={assets.banner2}
            alt="Joyful Threads"
            className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bottom Content */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h2 className="text-2xl md:text-2xl font-semibold text-black">
              Joyful Threads
            </h2>

            <button className="mt-2 flex items-center gap-2 text-sm font-medium uppercase underline underline-offset-4">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CmsBanner;
