'use client';
import { ArrowRight, Shield, CheckCircle, Download } from "lucide-react";

export default function ProductHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#8B0035]/5 via-white to-[#F4C430]/5">
      {/* Background Elements - Reduced size */}
      <div className="absolute inset-0">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-r from-[#F4C430]/10 to-[#8B0035]/10 blur-2xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge - More compact */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B0035]" />
            <span className="text-xs font-semibold text-[#8B0035]">
              Pharmaceutical Grade Solutions
            </span>
          </div>
          
          {/* Main Title - Reduced size */}
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-[#8B0035] to-[#F4C430] bg-clip-text text-transparent">Products</span>
          </h1>
          
          {/* Subtitle - Smaller */}
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6">
            Discover Our Recommended Cleanroom Products
          </h2>
          
          {/* Description - Shorter */}
          <p className="text-base lg:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium cleanroom equipment and consumables for pharmaceutical manufacturing, 
            research labs, and healthcare facilities. All products meet international quality standards.
          </p>
          
          {/* Features - Compact layout */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#8B0035]" />
              </div>
              <span className="text-sm font-medium text-gray-800">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#8B0035]" />
              </div>
              <span className="text-sm font-medium text-gray-800">GMP Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#8B0035]">24/7</span>
              </div>
              <span className="text-sm font-medium text-gray-800">Support</span>
            </div>
          </div>
          
          {/* CTA Buttons - Side by side */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group relative overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <span className="relative z-10 flex items-center gap-2 cursor-pointer">
                <Download className="w-4 h-4" />
                Download Catalog
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0035] via-[#F4C430] to-[#8B0035] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:bg-[position:100%_0] bg-[position:0%_0]" />
            </button>
            
            <button className="group relative overflow-hidden px-6 py-3 rounded-full font-semibold border-2 hover:scale-[1.02] transition-all duration-300"
              style={{ 
                borderColor: '#F4C430',
                color: '#8B0035'
              }}
            >
              <span className="relative z-10 flex items-center gap-2 cursor-pointer">
                View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F4C430]/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}