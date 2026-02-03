'use client';

export default function ProductCategory({ category }) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="p-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">{category.icon}</span>
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg mb-2">{category.name}</h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
        
        {/* Count */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#8B0035]">
            {category.count} Products
          </span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#8B0035] group-hover:to-[#F4C430] transition-all duration-300">
            <span className="text-sm font-bold text-[#8B0035] group-hover:text-white">→</span>
          </div>
        </div>
      </div>
      
      {/* Hover effect line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B0035] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}