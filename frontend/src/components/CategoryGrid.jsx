import React from 'react';
import { ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets';

export default function CategoryGrid() {
  return (
    <div className="min-h-fit bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout: Stack all items vertically */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          
          {/* Left Large Box - Full width on mobile */}
          <div className="w-full lg:flex-1 relative group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="aspect-square sm:aspect-[5/5] overflow-hidden">
              <img
                src={assets.grid1}
                alt="Hand Bag"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <button className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 group/btn min-w-0">
              <span className=" text-xs sm:text-sm font-medium tracking-wide uppercase truncate">Hand Bag</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column - Full width on mobile */}
          <div className="w-full lg:flex-1 flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            
            {/* Top Row - Stack vertically on mobile, horizontal on tablet+ */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              
              {/* Shoes */}
              <div className="w-full sm:flex-1 relative group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={assets.grid2}
                    alt="Shoes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <button className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group/btn min-w-0">
                  <span className="text-xs font-medium tracking-wide uppercase truncate">Shoes</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Clothing */}
              <div className="w-full sm:flex-1 relative group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={assets.grid3}
                    alt="Clothing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <button className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group/btn min-w-0">
                  <span className="text-xs font-medium tracking-wide uppercase truncate">Clothing</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom Large Box */}
            <div className="w-full relative group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="aspect-square sm:aspect-[3/2] lg:aspect-auto lg:h-full overflow-hidden">
                <img
                  src={assets.grid4}
                  alt="Hand Watch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <button className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 group/btn min-w-0">
                <span className="text-xs sm:text-sm font-medium tracking-wide uppercase truncate">Hand Watch</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}