import React from "react";
import { categories, sizes, colors } from "./constants";

const FilterSidebar = ({
  selectedFilters,
  handleFilterChange,
  handlePriceChange,
  clearFilters,
  activeFilterCount,
}) => {
  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="sticky top-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-bold text-black uppercase tracking-widest">
            Filters
          </h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
            >
              Reset
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-black mb-5 uppercase tracking-widest">
            Category
          </h3>
          <div className="space-y-4">
            {categories.map((category) => (
              <label
                key={category.name}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedFilters.category.includes(category.name)}
                    onChange={() => handleFilterChange("category", category.name)}
                    className="w-3.5 h-3.5 text-black border border-gray-300 focus:ring-0"
                  />
                  <span className="ml-3 text-sm text-black group-hover:text-gray-600 transition-colors">
                    {category.name}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{category.count}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-black mb-5 uppercase tracking-widest">
            Price
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-medium text-black">
              <span>₹{selectedFilters.priceRange[0].toLocaleString()}</span>
              <span>₹{selectedFilters.priceRange[1].toLocaleString()}</span>
            </div>
            <div className="relative h-0.5">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200"></div>
              <div
                className="absolute top-0 h-0.5 bg-black"
                style={{
                  left: `${(selectedFilters.priceRange[0] / 50000) * 100}%`,
                  right: `${100 - (selectedFilters.priceRange[1] / 50000) * 100}%`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={selectedFilters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:bg-black cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={selectedFilters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:bg-black cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-black mb-5 uppercase tracking-widest">
            Size
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <label key={size} className="relative">
                <input
                  type="checkbox"
                  checked={selectedFilters.size.includes(size)}
                  onChange={() => handleFilterChange("size", size)}
                  className="sr-only peer"
                />
                <div className="py-2 px-2 text-center text-xs font-medium border border-gray-300 bg-white peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all cursor-pointer">
                  {size}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-black mb-5 uppercase tracking-widest">
            Color
          </h3>
          <div className="grid grid-cols-6 gap-2.5">
            {colors.map((color) => (
              <label key={color.value} className="relative">
                <input
                  type="checkbox"
                  checked={selectedFilters.color.includes(color.value)}
                  onChange={() => handleFilterChange("color", color.value)}
                  className="sr-only peer"
                />
                <div
                  className="w-7 h-7 border border-gray-300 cursor-pointer peer-checked:border-2 peer-checked:border-black transition-all"
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedFilters.color.includes(color.value) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white"></div>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;