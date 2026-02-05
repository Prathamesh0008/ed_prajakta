// edpharma-webshop\app\products\[slug]\page.jsx
'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronRight,
  Package,
  CheckCircle,
  Info,
  FileText,
  Award
} from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { getProductFullDetails, getRelatedProducts } from '@/app/data/compounds';

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug;
  
  // Get product full details
  const product = getProductFullDetails(slug);
  
  // Get related products
  const relatedProducts = getRelatedProducts(slug, 4);
  
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Add to cart function
  const handleAddToCart = () => {
    addToCart({
      id: slug,
      name: product.name,
      price: product.price,
      image: `/products/${slug}.jpg`,
      qty: quantity
    });
  };

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.compound || "Category", href: `/products/category/${product.compound?.toLowerCase()}` },
          { name: product.name || "Product", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Product Details Grid - More compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left Column - Product Image */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              {/* Main Image */}
              <div className="relative h-72 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${product.image})`,
                    backgroundColor: '#f0f0f0'
                  }}
                />
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-semibold shadow"
                      style={{
                        backgroundColor: tag === "In Stock" ? "#22C55E" : 
                                       tag === "Limited Stock" ? "#F59E0B" : 
                                       tag === "Fast Delivery" ? "#3B82F6" : "#8B0035",
                        color: "white"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span>{product.stock > 20 ? 'In Stock' : 'Low Stock'} - {product.stock} units available</span>
                </div>
                <span>SKU: {slug.toUpperCase()}</span>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Category and Manufacturer */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#8B0035]/10 text-[#8B0035] text-xs font-semibold">
                  {product.compound}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                  {product.manufacturer}
                </span>
              </div>
              
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#F4C430] text-[#F4C430]' : 'fill-gray-300 text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">({product.rating}/5) • {product.reviews || '127'} Reviews</span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-[#8B0035] mb-1">
                  ${product.price?.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">Inclusive of all taxes • Free shipping on orders over $50</div>
              </div>
              
              {/* Short Description */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Key Specifications */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {product.specifications?.slice(0, 4).map((spec, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">{spec.label}</div>
                      <div className="font-medium text-gray-900">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quantity & Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quantity</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        className="px-3 py-2 text-gray-600 hover:text-[#8B0035] transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 text-gray-600 font-medium min-w-[60px] text-center">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-2 text-gray-600 hover:text-[#8B0035] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      {product.stock} units available
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  
                  {/* <button className="flex-1 py-3 border-2 border-[#F4C430] text-[#8B0035] font-semibold rounded-lg hover:bg-[#F4C430]/10 transition-all duration-300 flex items-center justify-center gap-2">
                    <Package className="w-4 h-4" />
                    Buy Now
                  </button> */}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#8B0035] text-[#8B0035]' : 'text-gray-600'}`} />
                    </button>
                    
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8B0035]" />
                    <div>
                      <div className="text-xs text-gray-600 font-medium">Free Shipping</div>
                      <div className="text-xs text-gray-600">Over $50</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#8B0035]" />
                    <div>
                      <div className="text-xs text-gray-600 font-medium">30-Day Returns</div>
                      <div className="text-xs text-gray-600">Easy returns</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#8B0035]" />
                    <div>
                      <div className="text-xs  text-gray-600 font-medium">Secure</div>
                      <div className="text-xs text-gray-600">Payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs - More compact */}
          <div className="mb-8">
            {/* Tab Headers */}
            <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
              {[
                { id: 'description', label: 'Description', icon: <Info className="w-4 h-4" /> },
                { id: 'specifications', label: 'Specifications', icon: <FileText className="w-4 h-4" /> },
                { id: 'benefits', label: 'Benefits', icon: <Award className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-[#8B0035]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B0035] to-[#F4C430]" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Product Description</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {product.description} This pharmaceutical product is manufactured in compliance with 
                      Good Manufacturing Practices (GMP) and undergoes rigorous quality control testing 
                      to ensure safety and efficacy.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {product.features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-[#8B0035] flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Product Specifications</h3>
                  <div className="space-y-3">
                    {product.specifications?.map((spec, index) => (
                      <div key={index} className="flex items-start border-b border-gray-100 pb-3">
                        <div className="w-1/3 text-sm text-gray-500 font-medium">{spec.label}</div>
                        <div className="w-2/3 text-sm text-gray-900">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'benefits' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits & Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
                <button className="text-sm text-[#8B0035] font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.slug}
                    product={{
                      id: relatedProduct.slug,
                      name: relatedProduct.name,
                      price: `$${relatedProduct.price?.toFixed(2)}`,
                      rating: relatedProduct.rating,
                      image: relatedProduct.image,
                      description: `${relatedProduct.manufacturer} – ${relatedProduct.compound}`,
                      category: relatedProduct.compound,
                      tags: relatedProduct.stock > 40 ? ["In Stock"] : ["Limited Stock"],
                      features: [
                        `Manufacturer: ${relatedProduct.manufacturer}`,
                        `Compound: ${relatedProduct.compound}`
                      ]
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Important Information */}
          <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl p-6 border border-[#8B0035]/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8B0035] mt-2 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  This product requires a valid prescription from a licensed healthcare professional.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8B0035] mt-2 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  Consult your doctor before use. Not for use by individuals under 18 years of age.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8B0035] mt-2 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  Keep out of reach of children. Store in a cool, dry place away from direct sunlight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}