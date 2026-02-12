// edpharma-webshop/components/Navbar.jsx
'use client'
import Link from "next/link";
import { Menu, X, Phone, Truck, Shield, User, ChevronDown, LogIn, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";
import products from "@/app/data/en";

export default function Navbar() {
  const [menuAnimated, setMenuAnimated] = useState(false);
const userMenuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);
  
  const searchRef = useRef(null);
  
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const pathname = usePathname();

  const colors = {
    primary: "#8B0035",
    secondary: "#F4C430",
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Get product list for search
  const productList = Object.values(products || {}).filter(
    (p) => p && typeof p === "object" && p.name && p.slug
  );

  // Filter products based on search query
  const filteredProducts = searchQuery.trim().length > 0
    ? productList.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!user) return "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getUserDisplayName = () => {
    if (!user) return "Account";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName.charAt(0)}.`;
    }
    return user.firstName || user.email?.split('@')[0] || "Account";
  };

  const userMenuItems = user 
    ? [
        { label: "My Profile", href: "/account", icon: <User className="w-4 h-4" /> },
        { label: "My Orders", href: "/account/orders", icon: <ShoppingCart className="w-4 h-4" /> },
        { label: "Wishlist", href: "/account/wishlist" },
        { 
          label: "Logout", 
          href: "#", 
          color: "text-red-600",
          icon: <LogOut className="w-4 h-4" />,
          onClick: () => {
            logout();
            setIsUserMenuOpen(false);
            setIsMenuOpen(false);
          }
        }
      ]
    : [
        { label: "Sign In", href: "/auth/signin", icon: <LogIn className="w-4 h-4" /> },
        { label: "Create Account", href: "/auth/signup" },
      ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowMobileSearchResults(false);
        if (window.innerWidth < 768) {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim().length > 0) {
      setShowMobileSearchResults(true);
    } else {
      setShowMobileSearchResults(false);
    }
  };

  // Handle search result click
  const handleSearchResultClick = () => {
    setSearchQuery("");
    setShowMobileSearchResults(false);
    setIsSearchExpanded(false);
    setIsMenuOpen(false);
  };

  // Toggle mobile search
  const toggleMobileSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchQuery("");
      setShowMobileSearchResults(false);
    }
  };

  return (
    <>
      {/* Top Announcement Bar - Responsive */}
      <div className="w-full bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="whitespace-nowrap">Free shipping over ₹999</span>
              </div>
              <div className="hidden md:flex items-center gap-1 sm:gap-2">
                <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>100% Secure Shopping</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="whitespace-nowrap">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-50/95 backdrop-blur-lg shadow-md' 
          : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#8B0035] to-[#F4C430] flex items-center justify-center">
                    <span className="text-white font-bold text-base sm:text-lg">EP</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#8B0035] to-[#F4C430] rounded-lg sm:rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl sm:text-2xl tracking-tight text-gray-900">EdPharma</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 sm:-mt-1">Pharmaceutical Excellence</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 
                      rounded-lg font-medium transition-colors text-sm sm:text-base
                      ${
                        isActive
                          ? "bg-[#8B0035]/10 text-[#8B0035]"
                          : "text-gray-700 hover:text-[#8B0035] hover:bg-gray-50"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Search Bar */}
              <div ref={searchRef} className="hidden md:flex items-center relative">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-[280px] lg:w-[360px] xl:w-[420px]
             pl-10 pr-4 py-2.5
             bg-white border border-gray-200 rounded-full
             focus:outline-none focus:ring-2 focus:ring-[#8B0035]/30
             focus:border-[#8B0035]
             text-sm text-black"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  
                  {/* Desktop Search Results */}
                  {filteredProducts.length > 0 && (
                    <div className="absolute top-full left-0 mt-3
                w-full
                bg-white border border-gray-200
                rounded-2xl shadow-2xl
                z-50
                max-h-[420px] overflow-auto">

                      {filteredProducts.slice(0, 6).map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          onClick={handleSearchResultClick}
                          className="block px-4 py-3 hover:bg-gray-50 transition text-sm text-gray-800 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {product.category} • ${parseFloat(product.price || 0).toFixed(2)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Search - Expanded View */}
              {isSearchExpanded && (
                <div ref={searchRef} className="md:hidden absolute left-0 right-0 top-16 bg-white px-4 py-3 shadow-lg border-t border-gray-200 z-40">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoFocus
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0035]/30 focus:border-[#8B0035] text-sm text-gray-900 placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    
                    {/* Mobile Search Results */}
                    {showMobileSearchResults && filteredProducts.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredProducts.slice(0, 8).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={handleSearchResultClick}
                            className="block px-4 py-3 hover:bg-gray-50 transition text-sm text-gray-800 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {product.category} • ${parseFloat(product.price || 0).toFixed(2)}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {showMobileSearchResults && filteredProducts.length === 0 && searchQuery.trim().length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                        <p className="text-sm text-gray-500 text-center">No products found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                {/* User Account Dropdown */}
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-700 font-medium transition-colors shadow-sm text-sm"
                  >
                    {user ? (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center text-white text-xs font-bold">
                        {getUserInitials()}
                      </div>
                    ) : (
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span>{getUserDisplayName()}</span>
                    <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        {user && (
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="font-medium text-gray-900">{getUserDisplayName()}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        )}
                        {userMenuItems.map((item) => (
                          item.href === "#" ? (
                            <button
                              key={item.label}
                              onClick={item.onClick}
                              className={`w-full text-left flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors ${item.color || 'text-gray-700'} text-sm`}
                            >
                              {item.icon}
                              {item.label}
                            </button>
                          ) : (
                            <Link
                              key={item.label}
                              href={item.href}
                              className={`flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors ${item.color || 'text-gray-700'} text-sm`}
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              {item.icon}
                              {item.label}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart */}
                <Link href="/cart" className="relative group">
                  <div className="p-1.5 sm:p-2.5 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-[#8B0035] transition-colors" />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#8B0035] to-[#F4C430] text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-lg">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile Search Button */}
                <button
                  onClick={toggleMobileSearch}
                  className="md:hidden p-1.5 sm:p-2.5 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                  aria-label="Search"
                >
                  {isSearchExpanded ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  ) : (
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-1.5 sm:p-2.5 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-sm"
                onClick={() => {
  if (!isMenuOpen) {
    setIsMenuOpen(true);
    setTimeout(() => setMenuAnimated(true), 10);
  } else {
    setMenuAnimated(false);
    setTimeout(() => setIsMenuOpen(false), 200);
  }
  if (isSearchExpanded) setIsSearchExpanded(false);
}}

                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  ) : (
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
  <div
    className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40
      transform transition-all duration-300 ease-out
      ${menuAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
    `}
  >

              <div className="p-3 sm:p-4 space-y-1">
                {/* Mobile Search inside menu */}
                <div className="mb-3 sm:mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.trim().length > 0) {
                          setShowMobileSearchResults(true);
                        }
                      }}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-[#8B0035]/30 focus:border-[#8B0035] text-sm"
                    />
                    <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    
                    {/* Search Results inside mobile menu */}
                    {showMobileSearchResults && filteredProducts.length > 0 && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow max-h-60 overflow-auto">
                        {filteredProducts.slice(0, 6).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={() => {
                              handleSearchResultClick();
                              setIsMenuOpen(false);
                            }}
                            className="block px-4 py-3 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {product.category} • ${parseFloat(product.price || 0).toFixed(2)}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {showMobileSearchResults && filteredProducts.length === 0 && searchQuery.trim().length > 0 && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow p-4">
                        <p className="text-sm text-gray-500 text-center">No products found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Info in Mobile Menu */}
                {user && (
                  <div className="px-3 sm:px-4 py-3 bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-lg mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center text-white font-bold">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{getUserDisplayName()}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Nav Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:text-[#8B0035] hover:bg-gray-50 rounded-lg font-medium transition-colors text-sm sm:text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile User Options */}
                <div className="pt-3 sm:pt-4 border-t border-gray-100">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 px-3 sm:px-4">Account</h4>
                  {userMenuItems.map((item) => (
                    item.href === "#" ? (
                      <button
                        key={item.label}
                        onClick={() => {
                          item.onClick?.();
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 rounded-lg transition-colors text-sm ${item.color || 'text-gray-700'}`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 rounded-lg transition-colors text-sm ${item.color || 'text-gray-700'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Background overlay for mobile menu */}
      {(isMenuOpen || isSearchExpanded) && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setIsSearchExpanded(false);
          }}
        />
      )}

      
    </>
  );
}







