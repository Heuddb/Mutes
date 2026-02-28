import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchHistory } from "./constants";
import { useGetAllProductsQuery } from "../../Redux/Api/products/productsApi";
import { useEffect, useState } from "react";

const SearchPanel = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  isMobile = false,
}) => {
  const navigate = useNavigate();
  const { data: allProducts = [] } = useGetAllProductsQuery();
  const [searchResults, setSearchResults] = useState([]);

  const popularSearches = [
    "Shoes",
    "Dresses",
    "Bags",
    "Watches",
    "Perfume",
    "Accessories",
  ];

  // Debounce search query and compute results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const handler = setTimeout(() => {
      const q = searchQuery.toLowerCase();
      const matches = (allProducts || []).filter((p) => {
        return (
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q))
        );
      });
      setSearchResults(matches.slice(0, 10)); // limit to top 10
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, allProducts?.length]);

  const submitSearch = () => {
    const term = searchQuery.trim();
    if (term) {
      onClose();
      navigate(`/collection?q=${encodeURIComponent(term)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  return (
    <div
      className={`fixed top-0 ${
        isMobile ? "right-0" : "left-0"
      } h-full ${
        isMobile ? "w-full" : "w-96"
      } bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto scrollbar-hide ${
        isOpen
          ? "translate-x-0"
          : isMobile
          ? "translate-x-full"
          : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 hover:opacity-70 transition-opacity duration-300"
        >
          <X className="w-7 h-7 text-gray-800" />
        </button>

        <div className={isMobile ? "mt-12" : "mt-16"}>
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-gray-400 focus-within:border-black transition-all duration-300 pb-2 px-1 mb-6">
            <button onClick={submitSearch} className="p-1">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              placeholder={isMobile ? "Search products..." : "Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full"
              autoFocus={isMobile}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search results panel */}
          {searchResults.length > 0 && (
            <div className="mt-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Results
              </h3>
              <div className="space-y-2 max-h-60 overflow-auto">
                {searchResults.map((p) => (
                  <div
                    key={p._id || p.id}
                    className="py-1 px-2 rounded hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      onClose();
                      navigate(`/product-details/${p._id || p.id}`);
                    }}
                  >
                    <span className="text-sm text-gray-700 truncate">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Popular Searches
            </h3>
            <div className="space-y-2">
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 py-2 px-2 rounded hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
                  onClick={() => {
                    setSearchQuery(item);
                    onClose();
                    navigate(`/collection?q=${encodeURIComponent(item)}`);
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200 flex-shrink-0" />
                    <span className="text-sm text-gray-700 group-hover:text-black transition-colors duration-200 truncate">
                      {item}
                    </span>
                  </div>
                  <button
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Remove from search history logic here
                    }}
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Searches (Mobile Only) */}
          {isMobile && (
            <div className="mt-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(tag);
                      onClose();
                      navigate(`/collection?q=${encodeURIComponent(tag)}`);
                    }}
                    className="px-3 py-1.5 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-black hover:text-black hover:bg-gray-50 transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;