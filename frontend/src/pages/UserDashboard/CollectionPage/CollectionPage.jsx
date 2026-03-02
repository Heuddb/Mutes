import React, { useState, useMemo } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQueryParam = searchParams.get("q") || "";

  // Build query parameters for the API
  const queryParams = useMemo(() => {
    const params = {
      page: currentPage,
      limit: pageSize
    };

    // Add search if present
    if (searchQueryParam) {
      params.search = searchQueryParam;
    }

    // Add route-based filters
    if (params.category) {
      return { ...params, category: params.category };
    }

    if (params.gender) {
      return { ...params, gender: params.gender };
    }

    if (params.condition) {
      return { ...params, condition: params.condition };
    }

    // Add manual filter selections
    if (selectedFilters.category.length > 0) {
      params.category = selectedFilters.category[0]; // API expects single category
    }

    if (selectedFilters.priceRange[0] > 0 || selectedFilters.priceRange[1] < 100000) {
      params.minPrice = selectedFilters.priceRange[0];
      params.maxPrice = selectedFilters.priceRange[1];
    }

    if (selectedFilters.sort) {
      params.sort = selectedFilters.sort;
    }

    return params;
  }, [currentPage, pageSize, searchQueryParam, selectedFilters, params]);

  const { data, isLoading, isError } = useGetAllProductsQuery(queryParams);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen">Error loading products.</div>;
  }

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...selectedFilters.priceRange];
    newRange[index] = parseInt(value);
    setSelectedFilters((prev) => ({ ...prev, priceRange: newRange }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setSelectedFilters(initialFilters);
    setCurrentPage(1);
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
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
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