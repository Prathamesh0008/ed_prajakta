import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCategory from '@/components/ProductCategory';
import ProductCard from '@/components/ProductCard';
import ProductHero from '@/components/ProductHero';
import FilterSidebar from '@/components/FilterSidebar';
import { categories, products } from '@/app/data';

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white">
        <ProductHero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <FilterSidebar categories={categories} />
            </div>
            
            {/* Main Products Content */}
            <div className="lg:w-3/4">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Our Cleanroom Solutions
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover our complete range of pharmaceutical-grade products, from sterile cleanroom equipment to essential consumables, engineered for maximum safety, compliance, and operational efficiency in healthcare and manufacturing.
                </p>
              </div>
              
              {/* Product Categories */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {categories.map((category) => (
                  <ProductCategory key={category.id} category={category} />
                ))}
              </div>
              
              {/* Featured Products */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Recommended Products</h2>
                  <div className="flex items-center gap-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-transparent">
                      <option>Sort by: Recommended</option>
                      <option>Sort by: Price Low to High</option>
                      <option>Sort by: Price High to Low</option>
                      <option>Sort by: Newest</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}