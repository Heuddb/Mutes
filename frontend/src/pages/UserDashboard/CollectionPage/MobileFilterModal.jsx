import React from "react";
import { categories, sizes, colors } from "./constants";

const MobileFilterModal = ({
  isFilterOpen,
  setIsFilterOpen,
  selectedFilters,
  handleFilterChange,
  handlePriceChange,
  clearFilters,
}) => {
  if (!isFilterOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        onClick={() => setIsFilterOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-black uppercase tracking-widest">
              Filters
            </h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-black font-bold text-lg"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-black mb-4 uppercase tracking-widest">
              Category
            </h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.category.includes(category.name)}
                      onChange={() => handleFilterChange("category", category.name)}
                      className="w-3.5 h-3.5 text-black border border-gray-300"
                    />
                    <span className="ml-3 text-sm text-black">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{category.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-bold text-black mb-4 uppercase tracking-widest">
              Price
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-medium text-black">
                <span>₹{selectedFilters.priceRange[0].toLocaleString()}</span>
                <span>₹{selectedFilters.priceRange[1].toLocaleString()}</span>
              </div>
              <div className="relative h-0.5">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200"></div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={selectedFilters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:bg-black cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={selectedFilters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:bg-black cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="text-xs font-bold text-black mb-4 uppercase tracking-widest">
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
                  <div className="py-2 px-2 text-center text-xs font-medium border border-gray-300 bg-white peer-checked:border-black peer-checked:bg-black peer-checked:text-white cursor-pointer">
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="text-xs font-bold text-black mb-4 uppercase tracking-widest">
              Color
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((color) => (
                <label key={color.value} className="relative">
                  <input
                    type="checkbox"
                    checked={selectedFilters.color.includes(color.value)}
                    onChange={() => handleFilterChange("color", color.value)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-7 h-7 border border-gray-300 peer-checked:border-2 peer-checked:border-black cursor-pointer"
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

        <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-white space-y-3">
          <button
            onClick={clearFilters}
            className="w-full py-3 text-xs font-bold border border-gray-300 text-black hover:border-black transition-colors uppercase tracking-widest"
          >
            Clear All
          </button>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full py-3 text-xs font-bold bg-black text-white hover:bg-gray-900 transition-colors uppercase tracking-widest"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterModal;