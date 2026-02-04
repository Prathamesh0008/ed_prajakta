//edpharma-webshop\components\FilterSidebar.jsx
'use client';
import { Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FilterSidebar({
  manufacturers = [],
  compounds = [],
  filters,
  setFilters,
  allProducts = [],
  isMobileOpen = false,
  onClose = () => {}
}) {
  const [priceRange, setPriceRange] = useState([0, 100]);

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  // Count products for each manufacturer
  const getManufacturerCount = (manufacturer) => {
    return allProducts.filter(p => p.manufacturer === manufacturer).length;
  };

  // Count products for each compound
  const getCompoundCount = (compound) => {
    return allProducts.filter(p => p.compound === compound).length;
  };

  // Reset price when clear all
  const handleClearAll = () => {
    setFilters({
      manufacturers: [],
      compounds: [],
      price: 100
    });
    setPriceRange([0, 100]);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div className={`
        bg-white rounded-xl shadow-lg border border-gray-200 
        lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] lg:overflow-y-auto
        ${isMobileOpen 
          ? 'fixed top-0 left-0 h-full w-80 z-50 overflow-y-auto animate-slideIn' 
          : 'hidden lg:block'
        }
      `}>
        <div className="p-6">
          {/* Header with close button for mobile */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-[#8B0035]" />
              <h3 className="text-lg text-gray-700 font-bold">Filters</h3>
            </div>
            
            <div className="flex items-center gap-2">
              {(filters.manufacturers.length > 0 || filters.compounds.length > 0 || filters.price < 100) && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-gray-500 hover:text-[#8B0035] hidden lg:block"
                >
                  Clear all
                </button>
              )}
              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters Badges */}
          {(filters.manufacturers.length > 0 || filters.compounds.length > 0 || filters.price < 100) && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Active Filters</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.manufacturers.map(m => (
                  <span key={m} className="inline-flex items-center gap-1 bg-[#8B0035]/10 text-[#8B0035] text-xs px-3 py-1.5 rounded-full">
                    {m}
                    <button
                      onClick={() => toggleFilter('manufacturers', m)}
                      className="hover:text-[#6b0028]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.compounds.map(c => (
                  <span key={c} className="inline-flex items-center gap-1 bg-[#F4C430]/10 text-[#8B0035] text-xs px-3 py-1.5 rounded-full">
                    {c}
                    <button
                      onClick={() => toggleFilter('compounds', c)}
                      className="hover:text-[#6b0028]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.price < 100 && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    Max: ${filters.price}
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, price: 100 }));
                        setPriceRange([0, 100]);
                      }}
                      className="hover:text-gray-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Manufacturer */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Manufacturer</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {manufacturers.map(m => (
                <label key={m} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.manufacturers.includes(m)}
                    onChange={() => toggleFilter('manufacturers', m)}
                    className="w-4 h-4 accent-[#8B0035]"
                  />
                  <span className="text-gray-700 flex-1">{m}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {getManufacturerCount(m)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Compound */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Compound</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {compounds.map(c => (
                <label key={c} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.compounds.includes(c)}
                    onChange={() => toggleFilter('compounds', c)}
                    className="w-4 h-4 accent-[#8B0035]"
                  />
                  <span className="text-gray-700 flex-1">{c}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {getCompoundCount(c)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-700 mb-3">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </h4>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([0, val]);
                setFilters(prev => ({ ...prev, price: val }));
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B0035]"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleClearAll}
              className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors lg:hidden"
            >
              Clear All Filters
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#8B0035] text-white font-semibold rounded-lg hover:bg-[#6b0028] transition-colors lg:hidden"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearAll}
              className="w-full py-3 bg-[#8B0035] text-white font-semibold rounded-lg hover:bg-[#6b0028] transition-colors hidden lg:block"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}