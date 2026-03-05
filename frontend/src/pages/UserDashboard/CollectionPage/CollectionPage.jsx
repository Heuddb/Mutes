import React, { useMemo, useState } from "react";
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

const MIN_PRICE = 0;
const MAX_PRICE = 50000;

const CollectionPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const {
    category: routeCategory,
    gender: routeGender,
    condition: routeCondition,
  } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQueryParam = searchParams.get("q") || "";

  // Fetch all products once; filtering and pagination are handled on the client
  const { data, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen">Error loading products.</div>;
  }

  const products = data?.products || [];

  // Apply all filters on the client side
  const filteredProducts = useMemo(() => {
    const searchTerm = searchQueryParam.trim().toLowerCase();

    return products
      .filter((product) => {
        if (!searchTerm) return true;

        const name = product?.name?.toLowerCase() || "";
        const brand = product?.brand?.toLowerCase() || "";

        return name.includes(searchTerm) || brand.includes(searchTerm);
      })
      .filter((product) => {
        if (!routeCategory) return true;
        const category = product?.category;
        if (!category) return false;
        return String(category).toLowerCase() === routeCategory.toLowerCase();
      })
      .filter((product) => {
        if (!routeGender) return true;
        const gender = product?.attributes?.gender || product?.gender;
        if (!gender) return false;
        return String(gender).toLowerCase() === routeGender.toLowerCase();
      })
      .filter((product) => {
        if (!routeCondition) return true;
        const condition = product?.condition;
        if (!condition) return false;
        return (
          String(condition).toLowerCase() === routeCondition.toLowerCase()
        );
      })
      .filter((product) => {
        if (routeCategory || selectedFilters.category.length === 0) return true;
        const category = product?.category;
        if (!category) return false;
        return selectedFilters.category
          .map((c) => c.toLowerCase())
          .includes(String(category).toLowerCase());
      })
      .filter((product) => {
        if (selectedFilters.size.length === 0) return true;
        const size = product?.size;
        if (!size) return false;
        return selectedFilters.size
          .map((s) => s.toLowerCase())
          .includes(String(size).toLowerCase());
      })
      .filter((product) => {
        if (selectedFilters.color.length === 0) return true;
        const color = product?.color;
        if (!color) return false;
        return selectedFilters.color
          .map((c) => c.toLowerCase())
          .includes(String(color).toLowerCase());
      })
      .filter((product) => {
        const price = Number(product?.price);
        if (Number.isNaN(price)) return true;

        const [min, max] = selectedFilters.priceRange;
        if (min === MIN_PRICE && max === MAX_PRICE) return true;

        return price >= min && price <= max;
      })
      .sort((a, b) => {
        const sortBy = selectedFilters.sortBy;

        if (sortBy === "newest") {
          const dateA = new Date(a?.createdAt || 0).getTime();
          const dateB = new Date(b?.createdAt || 0).getTime();
          return dateB - dateA;
        }

        if (sortBy === "price-low") {
          return (a?.price || 0) - (b?.price || 0);
        }

        if (sortBy === "price-high") {
          return (b?.price || 0) - (a?.price || 0);
        }

        if (sortBy === "rating") {
          return (b?.rating || 0) - (a?.rating || 0);
        }

        // "featured" or unknown sort: leave order as-is
        return 0;
      });
  }, [
    products,
    routeCategory,
    routeGender,
    routeCondition,
    searchQueryParam,
    selectedFilters,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize || 1)
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage, pageSize]);

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
    const parsedValue = Number.parseInt(value, 10);
    if (Number.isNaN(parsedValue)) return;

    setSelectedFilters((prev) => {
      const newRange = [...prev.priceRange];
      newRange[index] = parsedValue;

      if (index === 0 && newRange[0] > newRange[1]) {
        newRange[1] = newRange[0];
      }

      if (index === 1 && newRange[1] < newRange[0]) {
        newRange[0] = newRange[1];
      }

      return { ...prev, priceRange: newRange };
    });

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
          <ProductGrid products={paginatedProducts} />

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
