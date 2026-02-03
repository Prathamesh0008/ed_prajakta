'use client';
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FilterSidebar() {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    standards: [],
    features: []
  });

  const categories = [
    "Cleanroom Furniture",
    "Air System",
    "Safety Equipment",
    "Cleanroom Consumables",
    "Equipment & Instruments",
    "Garments & Gloves",
    "Monitoring Systems",
    "Sterilization Equipment"
  ];

  const standards = [
    "ISO 14644 Certified",
    "GMP Compliant",
    "FDA Approved",
    "CE Marked",
    "UL Listed"
  ];

  const features = [
    "Antistatic",
    "Autoclavable",
    "Energy Efficient",
    "Modular Design",
    "Digital Display",
    "Wireless Connectivity"
  ];

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFilter = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
        <Filter className="w-5 h-5 text-[#8B0035]" />
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Price Range</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B0035]"
          />
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B0035] mt-2"
          />
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Product Category</h4>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(category)}
                  onChange={() => toggleFilter('categories', category)}
                  className="w-4 h-4 text-[#8B0035] bg-gray-100 border-gray-300 rounded focus:ring-[#8B0035] focus:ring-2"
                />
                <span className="text-gray-700">{category}</span>
              </label>
              <button
                onClick={() => toggleCategory(category)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategories.includes(category) ? 'rotate-180' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Standards */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Standards & Certifications</h4>
        <div className="space-y-2">
          {standards.map((standard, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.standards.includes(standard)}
                onChange={() => toggleFilter('standards', standard)}
                className="w-4 h-4 text-[#8B0035] bg-gray-100 border-gray-300 rounded focus:ring-[#8B0035] focus:ring-2"
              />
              <span className="text-gray-700">{standard}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Features</h4>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.features.includes(feature)}
                onChange={() => toggleFilter('features', feature)}
                className="w-4 h-4 text-[#8B0035] bg-gray-100 border-gray-300 rounded focus:ring-[#8B0035] focus:ring-2"
              />
              <span className="text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setSelectedFilters({ categories: [], standards: [], features: [] });
          setPriceRange([0, 10000]);
        }}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 text-[#8B0035] font-semibold rounded-lg hover:from-[#8B0035]/20 hover:to-[#F4C430]/20 transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );
}