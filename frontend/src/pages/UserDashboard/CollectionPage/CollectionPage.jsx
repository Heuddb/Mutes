import React, { useState } from "react";
import { useGetAllProductsQuery } from "../../../Redux/Api/products/productsApi";
import { useParams, useLocation } from "react-router-dom";

// Import Components
import FilterSidebar from "./FilterSidebar";
import MobileFilterModal from "./MobileFilterModal";
import ProductGrid from "./ProductGrid";
import Toolbar from "./Toolbar";
import Pagination from "./Pagination";

// Import Constants
import { initialFilters } from "./constants";

const CollectionPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQueryParam = searchParams.get("q") || "";

  const { data, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  // Filter products based on route params and selected filters
  const products = (data || []).filter((product) => {
    //  Gender from route (case-insensitive)
    if (
      params.gender &&
      product.attributes?.gender &&
      product.attributes.gender.toLowerCase() !== params.gender.toLowerCase()
    ) {
      return false;
    }

    //  Category from route (case-insensitive)
    if (
      params.category &&
      product.category &&
      product.category.toLowerCase() !== params.category.toLowerCase()
    ) {
      return false;
    }

    //  Condition from route (case-insensitive)
    if (
      params.condition &&
      product.condition &&
      product.condition.toLowerCase() !== params.condition.toLowerCase()
    ) {
      return false;
    }

    //  Manual category filter (checkbox)
    if (
      selectedFilters.category.length > 0 &&
      !selectedFilters.category.includes(product.category)
    ) {
      return false;
    }

    //  Price filter
    if (
      product.discountPrice < selectedFilters.priceRange[0] ||
      product.discountPrice > selectedFilters.priceRange[1]
    ) {
      return false;
    }

    //  Search query param
    if (searchQueryParam) {
      const q = searchQueryParam.toLowerCase();
      const nameMatch = product.name && product.name.toLowerCase().includes(q);
      const descMatch = product.description &&
        product.description.toLowerCase().includes(q);
      if (!nameMatch && !descMatch) return false;
    }

    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...selectedFilters.priceRange];
    newRange[index] = parseInt(value);
    setSelectedFilters((prev) => ({ ...prev, priceRange: newRange }));
  };

  const clearFilters = () => {
    setSelectedFilters(initialFilters);
  };

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, filter) => {
      if (Array.isArray(filter)) return count + filter.length;
      return count;
    },
    0
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Sidebar (Desktop) */}
          <FilterSidebar
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            handlePriceChange={handlePriceChange}
            clearFilters={clearFilters}
            activeFilterCount={activeFilterCount}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <Toolbar
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              activeFilterCount={activeFilterCount}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />

            {/* Products Grid */}
            <ProductGrid products={products} />

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedFilters={selectedFilters}
        handleFilterChange={handleFilterChange}
        handlePriceChange={handlePriceChange}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default CollectionPage;