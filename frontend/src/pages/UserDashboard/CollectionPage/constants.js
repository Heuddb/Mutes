export const categories = [
  { name: "WOMEN", count: 42 },
  { name: "MEN", count: 28 },
  { name: "BAGS", count: 35 },
  { name: "New Arrivals", count: 18 },
 
  
  { name: "SHOES", count: 8 },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];

export const colors = [
  { name: "Black", value: "black", hex: "#000000" },
  { name: "White", value: "white", hex: "#FFFFFF" },
  { name: "Gray", value: "gray", hex: "#6B7280" },
  { name: "Navy", value: "navy", hex: "#1E3A8A" },
  { name: "Brown", value: "brown", hex: "#78350F" },
  { name: "Beige", value: "beige", hex: "#D4A574" },
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export const initialFilters = {
  category: [],
  size: [],
  color: [],
  priceRange: [0, 50000],
  sortBy: "featured",
};