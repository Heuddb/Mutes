import { ShoppingCart, Heart, Package, Tag, HelpCircle } from "lucide-react";
export const navLinks = [
  { name: "Woman's Fashion", path: "/collections/gender/WOMEN" },
  { name: "Man's Fashion", path: "/collections/gender/MEN" },
  { name: "BAGS", path: "/collections/category/BAGS" },
  { name: "NEW", path: "/collections/condition/New" },
  { name: "SHOES", path: "/collections/category/SHOES" },
];

export const searchHistory = [
  "Summer Collection 2024",
  "Black Leather Handbag",
  "Men's Casual Shoes",
  "Women's Dresses",
  "Kids Accessories",
];

export const profileOptionsLoggedIn = [
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: Heart, label: "Wishlist", path: "/wishlist" },
  { icon: Package, label: "Orders", path: "/orders" },
  { icon: Tag, label: "Coupons", path: "/coupons" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

export const profileOptionsGuest = [
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: Heart, label: "Wishlist", path: "/wishlist" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];