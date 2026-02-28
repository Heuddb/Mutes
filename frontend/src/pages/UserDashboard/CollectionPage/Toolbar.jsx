import React from "react";
import { sortOptions } from "./constants";

const Toolbar = ({
  isFilterOpen,
  setIsFilterOpen,
  activeFilterCount,
  selectedFilters,
  setSelectedFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-6 border-b border-gray-200">
      <button
        className="lg:hidden text-black text-xs font-bold uppercase tracking-widest mb-4 sm:mb-0 border-b-2 border-black pb-1"
        onClick={() => setIsFilterOpen(true)}
      >
        Show Filters ({activeFilterCount > 0 ? activeFilterCount : "All"})
      </button>

      <div className="flex-1 sm:flex-none">
        <select
          value={selectedFilters.sortBy}
          onChange={(e) =>
            setSelectedFilters((prev) => ({
              ...prev,
              sortBy: e.target.value,
            }))
          }
          className="text-xs font-medium text-black border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black bg-white uppercase tracking-widest"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Toolbar;