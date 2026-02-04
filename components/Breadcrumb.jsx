//edpharma-webshop\components\Breadcrumb.jsx
'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  // items = [{ name: "Home", href: "/" }, { name: "Products", href: "/products" }, ...]

  return (
    <nav
      className="flex items-center text-[#677E8A] text-sm md:text-base bg-white w-full"
      aria-label="Breadcrumb"
    >
      {/* Add the same container width as Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 w-full">
        <div className="flex items-center py-3 overflow-x-auto">
          {items.map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              {index !== 0 && <ChevronRight className="w-4 h-4 mx-2 text-[#8B0035]" />}
              {index === items.length - 1 ? (
                <span className="text-[#8B0035] font-semibold whitespace-nowrap">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#6b0028] transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}