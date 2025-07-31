import React, { useContext, useState } from "react";
import {
  Menu,
  X,
  Heart,
  ShoppingCart,
  Search,
  User,
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import CartDrawer from "./CartDrawer";
import logo from "../assets/Images/Vernika1.png"; // adjust the path as needed

const navLinks = [
  { tag: "Home", route: "/" },
  { tag: "Collections", route: "/collection" },
  { tag: "About", route: "/about" },
  { tag: "Contact", route: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, usercart } = useContext(AppContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchQuery}`);
    setShowSearch(false);
  };

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
  };

  const isActive = (route) => location.pathname === route;

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Vernika Logo" className=" w-24 object-contain" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.tag}
              to={link.route}
              className={`transition-all duration-300 ${
                isActive(link.route)
                  ? "text-rose-900 font-bold"
                  : "hover:text-rose-900"
              }`}
            >
              {link.tag}
            </Link>
          ))}
        </nav>

        {/* Search Field */}
        {showSearch && (
          <form
            onSubmit={handleSubmit}
            className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded mt-2 w-96 z-50"
          >
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-1 outline-none"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        )}

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={handleSearchToggle} className="hover:text-rose-900">
            <Search size={22} />
          </button>
          <button
            className="hover:text-rose-900"
            onClick={() => alert("Wishlist Coming Soon! Stay Tuned!")}
          >
            <Heart size={22} />
          </button>
          <button
            className="relative hover:text-rose-900"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={22} />
            {usercart?.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {usercart.length}
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-rose-900 hover:text-rose-700"
            >
              <User size={22} />
              <span>Profile</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block px-4 py-2 bg-rose-900 text-white rounded-full hover:bg-rose-800"
            >
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-6 shadow-lg animate-slideDown">
          <nav className="flex flex-col space-y-4 font-medium text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.tag}
                to={link.route}
                onClick={() => setIsOpen(false)}
                className={`transition-all duration-300 ${
                  isActive(link.route)
                    ? "text-rose-900 font-bold"
                    : "hover:text-rose-900"
                }`}
              >
                {link.tag}
              </Link>
            ))}

            <div className="mt-4 flex items-center border rounded px-2">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                className="flex-1 px-2 py-1 outline-none"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <Heart
                size={22}
                className="hover:text-rose-900"
                onClick={() => alert("Wishlist Coming Soon! Stay Tuned!")}
              />
              <ShoppingCart
                size={22}
                className="hover:text-rose-900"
                onClick={() => {
                  setIsOpen(false);
                  setIsCartOpen(true);
                }}
              />
            </div>

            {isAuthenticated ? (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="mt-6 flex items-center space-x-2 text-rose-900 hover:text-rose-700"
              >
                <User size={22} />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-block px-4 py-2 bg-rose-900 text-white rounded-full hover:bg-rose-800"
              >
                Log In
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
