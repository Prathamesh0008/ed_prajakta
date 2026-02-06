// edpharma-webshop\app\products\[slug]\page.jsx
'use client';
import { useState, useMemo, useEffect } from 'react';
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
  CheckCircle,
  Info,
  FileText,
  Award,
  Pill,
  Package,
  Droplets,
  AlertTriangle,
  ClipboardCheck,
  Lock
} from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import products from '@/app/data/en';

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug;
  
  // Get product from the new data structure
  const productData = products[slug];
  
  // Get wishlist functionality
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(slug);
  
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(productData?.image || '');

  // Update selected image when product data changes
  useEffect(() => {
    if (productData?.image) {
      setSelectedImage(productData.image);
    }
  }, [productData]);

  if (!productData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <a href="/products" className="px-6 py-3 bg-[#8B0035] text-white font-semibold rounded-lg hover:bg-[#6b0028]">
              Browse Products
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get related products (products from same category)
  const relatedProducts = useMemo(() => {
    return Object.values(products)
      .filter(p => p.category === productData.category && p.slug !== slug)
      .slice(0, 4)
      .map(product => ({
        slug: product.slug,
        name: product.name,
       price: product.price,
        rating: 4.5,
        image: product.image,
        manufacturer: product.brand,
        compound: product.category,
        description: `${product.brand} • ${product.dosage}`,
        category: product.category,
        stock: 50,
        form: product.form,
        dosage: product.dosage,
        packSize: product.packSize
      }));
  }, [slug, productData.category]);

  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (isLiked) {
      removeFromWishlist(slug);
    } else {
      addToWishlist({
        id: slug,
        name: productData.name,
        price: parseFloat(productData.price),
        image: productData.image,
        category: productData.category,
        description: productData.description,
        rating: 4.5,
        brand: productData.brand,
        dosage: productData.dosage,
        form: productData.form
      });
    }
  };

  // Add to cart function
  const handleAddToCart = () => {
    addToCart({
      id: slug,
      name: productData.name,
      price: parseFloat(productData.price),
      image: productData.image,
      qty: quantity
    });
  };

  // Prepare specifications array
  const specifications = [
    { label: "Active Ingredient", value: productData.composition, icon: <Pill className="w-4 h-4" /> },
    { label: "Brand", value: productData.brand, icon: <Package className="w-4 h-4" /> },
    { label: "Dosage", value: productData.dosage, icon: <Droplets className="w-4 h-4" /> },
    { label: "Form", value: productData.form, icon: <ClipboardCheck className="w-4 h-4" /> },
    { label: "Pack Size", value: productData.packSize, icon: <Package className="w-4 h-4" /> },
    { label: "CAS ID", value: productData.casId, icon: <Lock className="w-4 h-4" /> },
    { label: "Category", value: productData.category, icon: <Info className="w-4 h-4" /> }
  ];

  // Tab configuration based on available data
  const availableTabs = [
    { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" />, condition: productData.overview && productData.overview.length > 0 },
    { id: 'how_it_works', label: 'How It Works', icon: <FileText className="w-4 h-4" />, condition: productData.how_it_works && productData.how_it_works.length > 0 },
    { id: 'specifications', label: 'Specifications', icon: <FileText className="w-4 h-4" />, condition: true },
    { id: 'sideEffects', label: 'Side Effects', icon: <AlertTriangle className="w-4 h-4" />, condition: productData.sideEffects && productData.sideEffects.length > 0 },
    { id: 'warnings', label: 'Warnings', icon: <AlertTriangle className="w-4 h-4" />, condition: productData.warnings && productData.warnings.length > 0 },
    { id: 'tips', label: 'Usage Tips', icon: <Award className="w-4 h-4" />, condition: productData.tips && productData.tips.length > 0 },
    { id: 'administration', label: 'Administration', icon: <CheckCircle className="w-4 h-4" />, condition: productData.administration && productData.administration.length > 0 }
  ].filter(tab => tab.condition);

  // If overview is not selected but available, set it as default
  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.some(tab => tab.id === activeTab)) {
      setActiveTab(availableTabs[0].id);
    }
  }, [productData]);

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: productData.category || "Category", href: `/products?category=${productData.category?.toLowerCase()}` },
          { name: productData.name || "Product", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
            {/* Left Column - Product Images */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              {/* Main Image */}
             <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4">

                {selectedImage ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${selectedImage})`,
                      backgroundColor: '#f0f0f0'
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow">
                    In Stock
                  </span>
                  {productData.dosage && (
                    <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold shadow">
                      {productData.dosage}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              {productData.additionalImages && productData.additionalImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedImage(productData.image)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === productData.image ? 'border-[#8B0035]' : 'border-gray-300'}`}
                  >
                    <img
                      src={productData.image}
                      alt={productData.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {productData.additionalImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-[#8B0035]' : 'border-gray-300'}`}
                    >
                      <img
                        src={img}
                        alt={`${productData.name} - view ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Stock Status */}
              <div className="flex items-center justify-between text-sm text-gray-600 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>In Stock • 50 units available</span>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">SKU: {slug.toUpperCase()}</span>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Category and Manufacturer */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#8B0035]/10 text-[#8B0035] text-xs font-semibold">
                  {productData.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                  {productData.brand}
                </span>
                {productData.form && (
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                    {productData.form}
                  </span>
                )}
              </div>
              
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {productData.name}
              </h1>
              
              {/* Composition */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <strong className="text-[#8B0035]">Active Composition:</strong> {productData.composition}
                </p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'fill-[#F4C430] text-[#F4C430]' : 'fill-gray-300 text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(4.5/5) • 127 Reviews</span>
              </div>
              
             {/* Price */}
<div className="mb-6">
  <div className="text-3xl font-bold text-[#8B0035] mb-1">
    $
    {Number(productData.price || 0).toFixed(2)}
  </div>
  <div className="text-sm text-gray-500">
    Inclusive of all taxes • Free shipping on orders over $50
  </div>
</div>

              
              {/* Short Description */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {productData.description}
                </p>
              </div>
              
              {/* Key Specifications */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {specifications.slice(0, 4).map((spec, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        {spec.icon}
                        {spec.label}
                      </div>
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
                      50 units available
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
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleWishlistToggle}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
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
                      <div className="text-xs text-gray-600 font-medium">Secure</div>
                      <div className="text-xs text-gray-600">Payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs - Dynamic based on available data */}
          {availableTabs.length > 0 && (
            <div className="mb-8">
              {/* Tab Headers */}
              <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
                {availableTabs.map((tab) => (
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
                {/* Overview Tab */}
                {activeTab === 'overview' && productData.overview && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Product Overview</h3>
                    <div className="space-y-3">
                   {activeTab === 'overview' && productData.overview && (
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Overview</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {productData.overview.join(" ")}
                            </p>
                          </div>
                        )}

                    </div>
                  </div>
                )}
                
                {/* How It Works Tab */}
               {activeTab === 'how_it_works' && productData.how_it_works && (
  <div>
    <h3 className="text-lg font-bold text-gray-900 mb-4">How It Works</h3>

    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
      {productData.how_it_works.join("\n\n")}
    </p>
  </div>
)}

                {/* Specifications Tab */}
                {activeTab === 'specifications' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Product Specifications</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {specifications.map((spec, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-[#8B0035]">
                              {spec.icon}
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 font-medium">{spec.label}</div>
                              <div className="text-gray-900 font-medium">{spec.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Side Effects Tab */}
                {activeTab === 'sideEffects' && productData.sideEffects && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Possible Side Effects</h3>
                    <div className="space-y-3">
                      {productData.sideEffects.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-red-50/50 rounded-lg border border-red-100">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Warnings Tab */}
                {activeTab === 'warnings' && productData.warnings && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Important Warnings & Precautions</h3>
                    <div className="space-y-3">
                      {productData.warnings.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tips Tab */}
                {activeTab === 'tips' && productData.tips && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Usage Tips & Storage</h3>
                    <div className="space-y-3">
                      {productData.tips.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-green-50/50 rounded-lg border border-green-100">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Administration Tab */}
                {activeTab === 'administration' && productData.administration && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Administration Guidelines</h3>
                    <div className="space-y-3">
                      {productData.administration.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
                <a 
                  href="/products" 
                  className="text-sm text-[#8B0035] font-medium hover:underline"
                >
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.slug}
                    product={{
                      id: relatedProduct.slug,
                      name: relatedProduct.name,
                  price: Number(relatedProduct.price ?? 0),

                      rating: relatedProduct.rating,
                      image: relatedProduct.image,
                      description: relatedProduct.description,
                      category: relatedProduct.category,
                      tags: ["In Stock"],
                      features: [
                        `Brand: ${relatedProduct.manufacturer}`,
                        `Dosage: ${relatedProduct.dosage}`,
                        `Form: ${relatedProduct.form}`
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
                <div className="w-2 h-2 rounded-full bg-[#8B0035] mt=2 flex-shrink-0" />
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








// // edpharma-webshop\app\products\[slug]\page.jsx
// 'use client';
// import { useState, useMemo } from 'react';
// import { useParams } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import Breadcrumbs from '@/components/Breadcrumb';
// import ProductCard from '@/components/ProductCard';
// import { 
//   Star, 
//   ShoppingCart, 
//   Heart, 
//   Share2, 
//   Truck, 
//   Shield, 
//   RotateCcw,
//   ChevronRight,
//   CheckCircle,
//   Info,
//   FileText,
//   Award
// } from 'lucide-react';
// import { useCart } from '@/app/context/CartContext';
// import products from '@/app/data/en';

// export default function ProductDetailsPage() {
//   const params = useParams();
//   const slug = params.slug;
  
//   // Get product from the new data structure
//   const productData = products[slug];
  
//   if (!productData) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
//             <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
//             <a href="/products" className="px-6 py-3 bg-[#8B0035] text-white font-semibold rounded-lg hover:bg-[#6b0028]">
//               Browse Products
//             </a>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   // Get related products (products from same category)
//   const relatedProducts = useMemo(() => {
//     return Object.values(products)
//       .filter(p => p.category === productData.category && p.slug !== slug)
//       .slice(0, 4)
//       .map(product => ({
//         slug: product.slug,
//         name: product.name,
//         price: parseFloat(product.price) || 0,
//         rating: 4.5,
//         image: product.image,
//         manufacturer: product.brand,
//         compound: product.category,
//         description: `${product.brand} • ${product.dosage}`,
//         category: product.category,
//         stock: 50,
//         form: product.form,
//         dosage: product.dosage,
//         packSize: product.packSize
//       }));
//   }, [slug, productData.category]);

//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [isLiked, setIsLiked] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [selectedImage, setSelectedImage] = useState(productData.image);

//   // Handle quantity changes
//   const incrementQuantity = () => setQuantity(prev => prev + 1);
//   const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

//   // Add to cart function
//   const handleAddToCart = () => {
//     addToCart({
//       id: slug,
//       name: productData.name,
//       price: parseFloat(productData.price),
//       image: productData.image,
//       qty: quantity
//     });
//   };

//   // Prepare specifications array
//   const specifications = [
//     { label: "Active Ingredient", value: productData.composition },
//     { label: "Brand", value: productData.brand },
//     { label: "Dosage", value: productData.dosage },
//     { label: "Form", value: productData.form },
//     { label: "Pack Size", value: productData.packSize },
//     { label: "CAS ID", value: productData.casId },
//     { label: "Category", value: productData.category }
//   ];

//   // Prepare benefits array
//   const benefits = [
//     `Contains ${productData.composition} for targeted action`,
//     "Manufactured following quality standards",
//     "Clinically studied formula",
//     "Suitable for adult use under medical supervision",
//     "Supports healthy circulatory function"
//   ];

//   return (
//     <>
//       <Navbar />
      
//       <Breadcrumbs 
//         items={[
//           { name: "Home", href: "/" },
//           { name: "Products", href: "/products" },
//           { name: productData.category || "Category", href: `/products?category=${productData.category?.toLowerCase()}` },
//           { name: productData.name || "Product", href: null }
//         ]}
//       />
      
//       <main className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-6xl mx-auto px-4">
//           {/* Product Details Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             {/* Left Column - Product Images */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
//               {/* Main Image */}
//               <div className="relative h-72 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4">
//                 <div 
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{ 
//                     backgroundImage: `url(${selectedImage})`,
//                     backgroundColor: '#f0f0f0'
//                   }}
//                 />
//                 {/* Overlay badges */}
//                 <div className="absolute top-3 left-3 flex flex-col gap-2">
//                   <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow">
//                     In Stock
//                   </span>
//                   <span className="px-3 py-1 rounded-full bg-[#F4C430] text-white text-xs font-semibold shadow">
//                     Fast Delivery
//                   </span>
//                 </div>
//               </div>
              
//               {/* Thumbnail Images */}
//               {productData.additionalImages && productData.additionalImages.length > 0 && (
//                 <div className="flex gap-2 overflow-x-auto pb-2">
//                   <button
//                     onClick={() => setSelectedImage(productData.image)}
//                     className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === productData.image ? 'border-[#8B0035]' : 'border-gray-300'}`}
//                   >
//                     <img
//                       src={productData.image}
//                       alt={productData.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                   {productData.additionalImages.map((img, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(img)}
//                       className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-[#8B0035]' : 'border-gray-300'}`}
//                     >
//                       <img
//                         src={img}
//                         alt={`${productData.name} - view ${index + 2}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
              
//               {/* Stock Status */}
//               <div className="flex items-center justify-between text-sm text-gray-600 mt-6">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-green-500" />
//                   <span>In Stock • 50 units available</span>
//                 </div>
//                 <span>SKU: {slug.toUpperCase()}</span>
//               </div>
//             </div>

//             {/* Right Column - Product Info */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//               {/* Category and Manufacturer */}
//               <div className="flex items-center gap-2 mb-4">
//                 <span className="px-3 py-1 rounded-full bg-[#8B0035]/10 text-[#8B0035] text-xs font-semibold">
//                   {productData.category}
//                 </span>
//                 <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
//                   {productData.brand}
//                 </span>
//               </div>
              
//               {/* Product Title */}
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
//                 {productData.name}
//               </h1>
              
//               {/* Rating */}
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-4 h-4 ${i < 4 ? 'fill-[#F4C430] text-[#F4C430]' : 'fill-gray-300 text-gray-300'}`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-gray-600 text-sm">(4.5/5) • 127 Reviews</span>
//               </div>
              
//               {/* Price */}
//               <div className="mb-6">
//                 <div className="text-3xl font-bold text-[#8B0035] mb-1">
//                   ${parseFloat(productData.price).toFixed(2)}
//                 </div>
//                 <div className="text-sm text-gray-500">Inclusive of all taxes • Free shipping on orders over $50</div>
//               </div>
              
//               {/* Short Description */}
//               <div className="mb-6">
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                   {productData.description}
//                 </p>
//               </div>
              
//               {/* Key Specifications */}
//               <div className="mb-6">
//                 <div className="grid grid-cols-2 gap-3">
//                   {specifications.slice(0, 4).map((spec, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-3">
//                       <div className="text-xs text-gray-500 mb-1">{spec.label}</div>
//                       <div className="font-medium text-gray-900">{spec.value}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Quantity & Actions */}
//               <div className="space-y-4">
//                 {/* Quantity Selector */}
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 mb-2">Quantity</h4>
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center border border-gray-300 rounded-lg">
//                       <button
//                         onClick={decrementQuantity}
//                         className="px-3 py-2 text-gray-600 hover:text-[#8B0035] transition-colors"
//                       >
//                         -
//                       </button>
//                       <span className="px-4 py-2 border-x border-gray-300 text-gray-600 font-medium min-w-[60px] text-center">{quantity}</span>
//                       <button
//                         onClick={incrementQuantity}
//                         className="px-3 py-2 text-gray-600 hover:text-[#8B0035] transition-colors"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       50 units available
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button
//                     onClick={handleAddToCart}
//                     className="flex-1 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
//                   >
//                     <ShoppingCart className="w-4 h-4" />
//                     Add to Cart
//                   </button>
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setIsLiked(!isLiked)}
//                       className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#8B0035] text-[#8B0035]' : 'text-gray-600'}`} />
//                     </button>
                    
//                     <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                       <Share2 className="w-4 h-4 text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Shipping Info */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   <div className="flex items-center gap-2">
//                     <Truck className="w-4 h-4 text-[#8B0035]" />
//                     <div>
//                       <div className="text-xs text-gray-600 font-medium">Free Shipping</div>
//                       <div className="text-xs text-gray-600">Over $50</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <RotateCcw className="w-4 h-4 text-[#8B0035]" />
//                     <div>
//                       <div className="text-xs text-gray-600 font-medium">30-Day Returns</div>
//                       <div className="text-xs text-gray-600">Easy returns</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Shield className="w-4 h-4 text-[#8B0035]" />
//                     <div>
//                       <div className="text-xs text-gray-600 font-medium">Secure</div>
//                       <div className="text-xs text-gray-600">Payment</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Tabs */}
//           <div className="mb-8">
//             {/* Tab Headers */}
//             <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
//               {[
//                 { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
//                 { id: 'how_it_works', label: 'How It Works', icon: <FileText className="w-4 h-4" /> },
//                 { id: 'specifications', label: 'Specifications', icon: <FileText className="w-4 h-4" /> },
//                 { id: 'sideEffects', label: 'Side Effects', icon: <FileText className="w-4 h-4" /> },
//                 { id: 'warnings', label: 'Warnings', icon: <Award className="w-4 h-4" /> },
//                 { id: 'tips', label: 'Tips', icon: <Award className="w-4 h-4" /> }
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap transition-colors relative ${
//                     activeTab === tab.id
//                       ? 'text-[#8B0035]'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   {tab.icon}
//                   {tab.label}
//                   {activeTab === tab.id && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B0035] to-[#F4C430]" />
//                   )}
//                 </button>
//               ))}
//             </div>
            
//             {/* Tab Content */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//               {activeTab === 'overview' && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Product Overview</h3>
//                   <div className="space-y-3">
//                     {productData.overview?.map((item, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <ChevronRight className="w-4 h-4 text-[#8B0035] mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700 text-sm">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {activeTab === 'how_it_works' && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">How It Works</h3>
//                   <div className="space-y-3">
//                     {productData.how_it_works?.map((item, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <ChevronRight className="w-4 h-4 text-[#8B0035] mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700 text-sm">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {activeTab === 'specifications' && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Product Specifications</h3>
//                   <div className="space-y-3">
//                     {specifications.map((spec, index) => (
//                       <div key={index} className="flex items-start border-b border-gray-100 pb-3">
//                         <div className="w-1/3 text-sm text-gray-500 font-medium">{spec.label}</div>
//                         <div className="w-2/3 text-sm text-gray-900">{spec.value}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {activeTab === 'sideEffects' && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Side Effects</h3>
//                   <div className="space-y-3">
//                     {productData.sideEffects?.map((item, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-[#8B0035] mt-2 flex-shrink-0" />
//                         <span className="text-gray-700 text-sm">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {activeTab === 'warnings' && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Warnings & Precautions</h3>
//                   <div className="space-y-3">
//                     {productData.warnings?.map((item, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
//                         <span className="text-gray-700 text-sm">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {activeTab === 'tips' && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Usage Tips & Storage</h3>
//                   <div className="space-y-3">
//                     {productData.tips?.map((item, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700 text-sm">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Related Products */}
//           {relatedProducts.length > 0 && (
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
//                 <a 
//                   href="/products" 
//                   className="text-sm text-[#8B0035] font-medium hover:underline"
//                 >
//                   View All
//                 </a>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {relatedProducts.map((relatedProduct) => (
//                   <ProductCard
//                     key={relatedProduct.slug}
//                     product={{
//                       id: relatedProduct.slug,
//                       name: relatedProduct.name,
//                       price: `$${relatedProduct.price.toFixed(2)}`,
//                       rating: relatedProduct.rating,
//                       image: relatedProduct.image,
//                       description: relatedProduct.description,
//                       category: relatedProduct.category,
//                       tags: ["In Stock"],
//                       features: [
//                         `Brand: ${relatedProduct.manufacturer}`,
//                         `Dosage: ${relatedProduct.dosage}`,
//                         `Form: ${relatedProduct.form}`
//                       ]
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Important Information */}
//           <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl p-6 border border-[#8B0035]/20">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
//             <div className="space-y-3">
//               <div className="flex items-start gap-2">
//                 <div className="w-2 h-2 rounded-full bg-[#8B0035] mt-2 flex-shrink-0" />
//                 <p className="text-gray-700 text-sm">
//                   This product requires a valid prescription from a licensed healthcare professional.
//                 </p>
//               </div>
//               <div className="flex items-start gap-2">
//                 <div className="w-2 h-2 rounded-full bg-[#8B0035] mt=2 flex-shrink-0" />
//                 <p className="text-gray-700 text-sm">
//                   Consult your doctor before use. Not for use by individuals under 18 years of age.
//                 </p>
//               </div>
//               <div className="flex items-start gap-2">
//                 <div className="w-2 h-2 rounded-full bg-[#8B0035] mt-2 flex-shrink-0" />
//                 <p className="text-gray-700 text-sm">
//                   Keep out of reach of children. Store in a cool, dry place away from direct sunlight.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }