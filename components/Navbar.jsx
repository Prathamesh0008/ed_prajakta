'use client'
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const colors = {
    primary: "#8B0035",
    secondary: "#F4C430",
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "#services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo with accent */}
        <div className="flex items-center gap-2">
          <Link href="/" className="relative">
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-[#8B0035] to-[#F4C430] rounded-lg blur opacity-30"
            />
            <div 
              className="relative font-bold text-2xl tracking-tight text-[#8B0035] hover:opacity-80 transition-opacity"
            >
              ED Pharma
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative px-5 py-3 text-sm font-medium text-gray-700 hover:text-[#8B0035] transition-colors group"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#8B0035] to-[#F4C430] transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button
            className="hidden md:block relative overflow-hidden group px-6 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            style={{ backgroundColor: colors.primary }}
          >
            <span className="relative z-10">Book Appointment</span>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#8B0035] to-[#6b0028] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
            />
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-white border-t shadow-lg animate-slideDown">
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-3 px-4 text-gray-700 hover:text-[#8B0035] hover:bg-gray-50 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                className="mt-4 px-6 py-3 rounded-full text-white font-semibold hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ backgroundColor: colors.primary }}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}