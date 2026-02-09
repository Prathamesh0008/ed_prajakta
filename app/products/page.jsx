//edpharma-webshop\app\products\page.jsx
'use client';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import products from '@/app/data/en';

export default function ProductsPage() {
  // Get all products from the new data structure
  const allProducts = useMemo(() => {
    return Object.values(products).map(product => ({
      slug: product.slug,
      name: product.name,
      price: parseFloat(product.price) || 0,
      rating: 4.5, // Default rating since not in new structure
      manufacturer: product.brand,
      compound: product.category,
      stock: 50, // Default stock value
      description: product.description,
      image: product.image,
      category: product.category,
      form: product.form,
      dosage: product.dosage,
      packSize: product.packSize
    }));
  }, []);

  // Initialize filters
  const [filters, setFilters] = useState({
    manufacturers: [],
    compounds: [],
    price: 1000
  });

  // Mobile filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique manufacturers
  const manufacturers = useMemo(() => {
    const uniqueBrands = [...new Set(allProducts.map(p => p.manufacturer))];
    return uniqueBrands.sort();
  }, [allProducts]);

  // Get unique compounds from all products
  const compounds = useMemo(() => {
    const uniqueCompounds = [...new Set(allProducts.map(p => p.compound))];
    return uniqueCompounds.sort();
  }, [allProducts]);

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Filter by manufacturer
      if (filters.manufacturers.length > 0) {
        if (!filters.manufacturers.includes(product.manufacturer)) {
          return false;
        }
      }

      // Filter by compound
      if (filters.compounds.length > 0) {
        if (!filters.compounds.includes(product.compound)) {
          return false;
        }
      }

      // Filter by price
      if (product.price > filters.price) {
        return false;
      }

      return true;
    });
  }, [allProducts, filters]);

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      manufacturers: [],
      compounds: [],
      price: 100
    });
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    return (
      filters.manufacturers.length + 
      filters.compounds.length + 
      (filters.price < 100 ? 1 : 0)
    );
  }, [filters]);

  return (
    <>
      <Navbar />
      <Breadcrumb 
        items={[
          { name: 'Home', href: '/' },
          { name: 'Products', href: '/products' }
        ]}
      />

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Mobile Filter Header */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600 mt-1">
                  {filteredProducts.length} products found
                </p>
              </div>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#8B0035] text-white rounded-lg hover:bg-[#6b0028] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white text-[#8B0035] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Active Filters - Mobile */}
            {(filters.manufacturers.length > 0 || filters.compounds.length > 0 || filters.price < 100) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.manufacturers.map(m => (
                  <span key={m} className="inline-flex items-center gap-1 bg-[#8B0035]/10 text-[#8B0035] text-sm px-3 py-1.5 rounded-full">
                    {m}
                    <button
                      onClick={() => handleFilterChange({
                        ...filters,
                        manufacturers: filters.manufacturers.filter(man => man !== m)
                      })}
                      className="hover:text-[#6b0028]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.compounds.map(c => (
                  <span key={c} className="inline-flex items-center gap-1 bg-[#F4C430]/10 text-[#8B0035] text-sm px-3 py-1.5 rounded-full">
                    {c}
                    <button
                      onClick={() => handleFilterChange({
                        ...filters,
                        compounds: filters.compounds.filter(comp => comp !== c)
                      })}
                      className="hover:text-[#6b0028]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.price < 100 && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                    Max: ${filters.price}
                    <button
                      onClick={() => handleFilterChange({...filters, price: 100})}
                      className="hover:text-gray-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {activeFilterCount > 1 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-600 hover:text-[#8B0035] px-3 py-1.5"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-full lg:w-1/4">
              <FilterSidebar
                manufacturers={manufacturers}
                compounds={compounds}
                filters={filters}
                setFilters={handleFilterChange}
                allProducts={allProducts}
              />
            </div>

            {/* Mobile Filter Sidebar */}
            <div className="lg:hidden">
              <FilterSidebar
                manufacturers={manufacturers}
                compounds={compounds}
                filters={filters}
                setFilters={handleFilterChange}
                allProducts={allProducts}
                isMobileOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>

            {/* Products Grid */}
            <div className="w-full lg:w-3/4">
              {/* Desktop Results Header */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {filteredProducts.length} Products Found
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filters.manufacturers.length > 0 && `Manufacturers: ${filters.manufacturers.join(', ')} `}
                    {filters.compounds.length > 0 && `Compounds: ${filters.compounds.join(', ')} `}
                    {filters.price < 100 && `Max Price: $${filters.price}`}
                  </p>
                </div>
                
                {/* Active Filters Display - Desktop */}
                {(filters.manufacturers.length > 0 || filters.compounds.length > 0 || filters.price < 100) && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.slug}
                      product={{
                        id: product.slug,
                        name: product.name,
                        price: product.price,
                        rating: product.rating,
                        image: product.image,
                        description: `${product.manufacturer} • ${product.dosage}`,
                        category: product.category,
                        tags: ["In Stock"],
                        features: [
                          `Manufacturer: ${product.manufacturer}`,
                          `Dosage: ${product.dosage}`,
                          `Form: ${product.form}`,
                          `Pack Size: ${product.packSize}`
                        ]
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-[#8B0035] text-white font-semibold rounded-lg hover:bg-[#6b0028]"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}





// //edpharma-webshop\app\products\page.jsx
// 'use client';
// import { useState, useMemo } from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import ProductCard from '@/components/ProductCard';
// import FilterSidebar from '@/components/FilterSidebar';
// import { getAllProducts, getManufacturers } from '@/app/data/compounds';
// import Breadcrumb from '@/components/Breadcrumb';
// import { Filter, X, SlidersHorizontal } from 'lucide-react';

// export default function ProductsPage() {
//   // Get all products
//   const allProducts = getAllProducts();
  
//   // Initialize filters
//   const [filters, setFilters] = useState({
//     manufacturers: [],
//     compounds: [],
//     price: 100
//   });

//   // Mobile filter state
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Get unique manufacturers
//   const manufacturers = getManufacturers();

//   // Get unique compounds from all products
//   const compounds = useMemo(() => {
//     const uniqueCompounds = [...new Set(allProducts.map(p => p.compound))];
//     return uniqueCompounds.sort(); // Sort alphabetically
//   }, [allProducts]);

//   // Filter products based on active filters
//   const filteredProducts = useMemo(() => {
//     return allProducts.filter(product => {
//       // Filter by manufacturer
//       if (filters.manufacturers.length > 0) {
//         if (!filters.manufacturers.includes(product.manufacturer)) {
//           return false;
//         }
//       }

//       // Filter by compound
//       if (filters.compounds.length > 0) {
//         if (!filters.compounds.includes(product.compound)) {
//           return false;
//         }
//       }

//       // Filter by price
//       if (product.price > filters.price) {
//         return false;
//       }

//       return true;
//     });
//   }, [allProducts, filters]);

//   // Handle filter change
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setFilters({
//       manufacturers: [],
//       compounds: [],
//       price: 100
//     });
//   };

//   // Active filter count
//   const activeFilterCount = useMemo(() => {
//     return (
//       filters.manufacturers.length + 
//       filters.compounds.length + 
//       (filters.price < 100 ? 1 : 0)
//     );
//   }, [filters]);

//   return (
//     <>
//       <Navbar />
//       <Breadcrumb 
//         items={[
//           { name: 'Home', href: '/' },
//           { name: 'Products', href: '/products' }
//         ]}
//       />

//       <main className="min-h-screen bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
//           {/* Mobile Filter Header */}
//           <div className="lg:hidden mb-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//                 <p className="text-gray-600 mt-1">
//                   {filteredProducts.length} products found
//                 </p>
//               </div>
              
//               {/* Mobile Filter Button */}
//               <button
//                 onClick={() => setIsFilterOpen(true)}
//                 className="flex items-center gap-2 px-4 py-2.5 bg-[#8B0035] text-white rounded-lg hover:bg-[#6b0028] transition-colors"
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 <span>Filters</span>
//                 {activeFilterCount > 0 && (
//                   <span className="bg-white text-[#8B0035] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                     {activeFilterCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Active Filters - Mobile */}
//             {(filters.manufacturers.length > 0 || filters.compounds.length > 0 || filters.price < 100) && (
//               <div className="mt-4 flex flex-wrap gap-2">
//                 {filters.manufacturers.map(m => (
//                   <span key={m} className="inline-flex items-center gap-1 bg-[#8B0035]/10 text-[#8B0035] text-sm px-3 py-1.5 rounded-full">
//                     {m}
//                     <button
//                       onClick={() => handleFilterChange({
//                         ...filters,
//                         manufacturers: filters.manufacturers.filter(man => man !== m)
//                       })}
//                       className="hover:text-[#6b0028]"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </span>
//                 ))}
//                 {filters.compounds.map(c => (
//                   <span key={c} className="inline-flex items-center gap-1 bg-[#F4C430]/10 text-[#8B0035] text-sm px-3 py-1.5 rounded-full">
//                     {c}
//                     <button
//                       onClick={() => handleFilterChange({
//                         ...filters,
//                         compounds: filters.compounds.filter(comp => comp !== c)
//                       })}
//                       className="hover:text-[#6b0028]"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </span>
//                 ))}
//                 {filters.price < 100 && (
//                   <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
//                     Max: ${filters.price}
//                     <button
//                       onClick={() => handleFilterChange({...filters, price: 100})}
//                       className="hover:text-gray-900"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//                 {activeFilterCount > 1 && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-sm text-gray-600 hover:text-[#8B0035] px-3 py-1.5"
//                   >
//                     Clear all
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
//             {/* Desktop Filter Sidebar */}
//             <div className="hidden lg:block w-full lg:w-1/4">
//               <FilterSidebar
//                 manufacturers={manufacturers}
//                 compounds={compounds}
//                 filters={filters}
//                 setFilters={handleFilterChange}
//                 allProducts={allProducts}
//               />
//             </div>

//             {/* Mobile Filter Sidebar */}
//             <div className="lg:hidden">
//               <FilterSidebar
//                 manufacturers={manufacturers}
//                 compounds={compounds}
//                 filters={filters}
//                 setFilters={handleFilterChange}
//                 allProducts={allProducts}
//                 isMobileOpen={isFilterOpen}
//                 onClose={() => setIsFilterOpen(false)}
//               />
//             </div>

//             {/* Products Grid */}
//             <div className="w-full lg:w-3/4">
//               {/* Desktop Results Header */}
//               <div className="hidden lg:flex justify-between items-center mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">
//                     {filteredProducts.length} Products Found
//                   </h2>
//                   <p className="text-gray-600 mt-1">
//                     {filters.manufacturers.length > 0 && `Manufacturers: ${filters.manufacturers.join(', ')} `}
//                     {filters.compounds.length > 0 && `Compounds: ${filters.compounds.join(', ')} `}
//                     {filters.price < 100 && `Max Price: $${filters.price}`}
//                   </p>
//                 </div>
                
//                 {/* Active Filters Display - Desktop */}
//                 {(filters.manufacturers.length > 0 || filters.compounds.length > 0 || filters.price < 100) && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//                   >
//                     <X className="w-4 h-4" />
//                     Clear All Filters
//                   </button>
//                 )}
//               </div>

//               {/* Products Grid */}
//               {filteredProducts.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {filteredProducts.map(product => (
//                     <ProductCard
//                       key={product.slug}
//                       product={{
//                         id: product.slug,
//                         name: product.name,
//                         price: `$${product.price}`,
//                         rating: product.rating,
//                         image: `/products/${product.slug}.jpg`,
//                         description: `${product.manufacturer} – ${product.compound}`,
//                         category: product.compound,
//                         tags: product.stock > 40 ? ["In Stock"] : ["Limited Stock"],
//                         features: [
//                           `Manufacturer: ${product.manufacturer}`,
//                           `Compound: ${product.compound}`,
//                           `Rating: ${product.rating}/5`
//                         ]
//                       }}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="text-gray-400 mb-4">
//                     <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
//                   <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-6 py-3 bg-[#8B0035] text-white font-semibold rounded-lg hover:bg-[#6b0028]"
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }