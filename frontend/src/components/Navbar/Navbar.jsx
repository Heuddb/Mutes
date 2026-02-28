import React, { useState } from "react";
import { Menu, Search, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slices/authSlice";

import { navLinks } from "./constants";
import ProfileSidebar from "./ProfileSlidebar";
import SearchPanel from "./SearchPannel";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .playfair-display {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* Desktop Navbar */}
      <nav className="bg-[#ffffff] border-b border-gray-300 sticky top-0 z-40 hidden md:block">
        <div className="max-w-full mx-auto px-4 sm:px-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center py-4">
            {/* Left Side - Menu Icon */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-300"
              >
                <Search className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            {/* Center - Logo */}
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl lg:text-4xl playfair-display text-gray-900 tracking-wider">
              <NavLink to="/">MUTES</NavLink>
            </h1>

            {/* Right Side - Profile Icon */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-300 relative"
              >
                <User className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center items-center gap-8 py-4 border-t border-gray-200">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveLink(link.name)}
                onMouseLeave={() => setActiveLink("")}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm text-gray-900 font-light tracking-wide transition-colors duration-300 group-hover:text-black ${
                      isActive ? "text-black" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
                <div
                  className={`absolute -bottom-4 left-0 right-0 h-[2px] bg-black transition-all duration-300 ${
                    activeLink === link.name
                      ? "w-full opacity-100"
                      : "w-0 opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="bg-[#ffffff] border-b border-gray-300 sticky top-0 z-40 md:hidden">
        <div className="px-4 py-3">
          {/* Top Row - Logo and Icons */}
          <div className="flex justify-between items-center">
            {/* Left Side - Logo only (no menu icon) */}
            <div className="flex items-center">
              <h1 className="text-2xl playfair-display text-gray-900 tracking-wider">
                MUTES
              </h1>
            </div>

            {/* Right Icons - Search and Profile */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <Search className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="hover:opacity-70 transition-opacity duration-300 relative"
              >
                <User className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Bottom Row - Category Scroll */}
          <div className="mt-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-6 min-w-max">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  className="text-sm text-gray-700 font-light whitespace-nowrap hover:text-black transition-colors duration-200"
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Panel - Desktop */}
      <SearchPanel
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMobile={false}
      />

      {/* Search Panel - Mobile */}
      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMobile={true}
      />

      {/* Profile Sidebar - Single component */}
      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;