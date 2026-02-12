// edpharma-webshop\app\wishlist\page.jsx
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft,
  Eye,
  Star,
  Truck,
  Shield,
  ChevronRight,
  AlertCircle,
  Clock,
  X
} from 'lucide-react';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCart } from '@/app/context/CartContext';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import products from '@/app/data/en';

export default function WishlistPage() {
  const { 
    wishlist, 
    removeFromWishlist, 
    clearWishlist,
    wishlistCount,
    loading 
  } = useWishlist();
  
  const { addToCart } = useCart();
  const [removing, setRemoving] = useState(null);

  // Get actual product from products data
  const getProductDetails = (productId) => {
    // Find product by ID (slug)
    const product = Object.values(products).find(p => p.slug === productId);
    const basePrice = product.pricing
  ? product.pricing[0].price
  : Number(product.price ?? 0);

    if (!product) return null;
    
    // Transform to match wishlist expectations
    return {
      id: product.slug,
      name: product.name,
      category: product.category,
     price: basePrice,
originalPrice: basePrice * 1.25,
 // 25% markup for original price
      discount: 25, // Default discount
      rating: 4.5, // Default rating
      reviews: 128, // Default reviews
     inStock: product.inStock !== false,
// Default stock status
      image: product.image || "/products/placeholder.jpg",
      description: product.description,
      manufacturer: product.brand,
      dosage: product.dosage,
      form: product.form,
      packSize: product.packSize,
      benefits: [
        `Manufacturer: ${product.brand}`,
        `Dosage: ${product.dosage}`,
        `Form: ${product.form}`,
        `Active: ${product.composition}`
      ],
      delivery: "2-3 business days",
      prescription: true,
      specifications: [
        { label: "Active Ingredient", value: product.composition },
        { label: "Dosage", value: product.dosage },
        { label: "Form", value: product.form },
        { label: "Pack Size", value: product.packSize }
      ]
    };
  };

  const handleRemove = async (productId) => {
    setRemoving(productId);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    removeFromWishlist(productId);
    setRemoving(null);
  };

  const handleAddToCart = (productId) => {
    const product = getProductDetails(productId);
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      const product = getProductDetails(item.id);
      if (product) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16 md:pt-20 pb-12">

          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/account" className="hover:text-[#8B0035] transition-colors">
              My Account
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">My Wishlist</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#8B0035]/10 to-[#F4C430]/10">
                  <Heart className="w-6 h-6 text-[#8B0035]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wishlist</h1>
                  <p className="text-gray-500 mt-1">
                    {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved for later
                  </p>
                </div>
              </div>
            </div>

            {wishlistCount > 0 && (
  <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">

                <button
                  onClick={handleMoveAllToCart}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Move All to Cart
                </button>
                <button
                  onClick={clearWishlist}
                  className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}
          </div>

          {wishlistCount === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-8">
                  Save your favorite products here to purchase them later or compare options.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/products"
                    className="px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Browse Products
                  </Link>
                  <Link
                    href="/account"
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Account
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

              {/* Wishlist Items */}
              <div className="lg:col-span-2 space-y-4">
                {wishlist.map((item) => {
                  const product = getProductDetails(item.id);
                  if (!product) return null;

                  const addedDate = new Date(item.addedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 sm:p-6">
                      <div className="flex flex-col md:flex-row gap-5 md:gap-6">

                          {/* Product Image */}
                          <div className="relative w-full md:w-32 h-52 md:h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {product.prescription && (
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                                  Rx Required
                                </span>
                              </div>
                            )}
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">Out of Stock</span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-[#8B0035] bg-[#8B0035]/10 px-2 py-1 rounded">
                                    {product.category}
                                  </span>
                                  <span className="text-xs text-gray-400">• Added {addedDate}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                  {product.description}
                                </p>

                                {/* Key Specifications */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                    {product.manufacturer}
                                  </span>
                                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                    {product.dosage}
                                  </span>
                                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                                    {product.form}
                                  </span>
                                </div>

                                {/* Rating and Delivery */}
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                  <div className="flex items-center gap-1">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < Math.floor(product.rating)
                                              ? 'text-[#F4C430] fill-[#F4C430]'
                                              : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="ml-1">{product.rating}</span>
                                    <span className="text-gray-400">({product.reviews} reviews)</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Truck className="w-4 h-4" />
                                    <span>{product.delivery}</span>
                                  </div>
                                </div>

                                {/* Price and Actions */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                                  <div className="flex items-center gap-3">
                                    <div className="flex items-baseline gap-2">
                                      <span className="text-2xl font-bold text-[#8B0035]">
                                        ${product.price.toFixed(2)}
                                      </span>
                                      {product.originalPrice && (
                                        <>
                                          <span className="text-lg text-gray-400 line-through">
                                            ${product.originalPrice.toFixed(2)}
                                          </span>
                                          <span className="text-sm font-bold text-green-600">
                                            {product.discount}% off
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                <div className="flex flex-wrap items-center gap-2">

                                    <button
                                      onClick={() => handleAddToCart(product.id)}
                                      disabled={!product.inStock || removing === product.id}
                                      className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                                        product.inStock
                                          ? 'bg-[#8B0035] text-white hover:bg-[#6b0028]'
                                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                      }`}
                                    >
                                      <ShoppingCart className="w-4 h-4" />
                                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                    <Link
                                      href={`/products/${product.id}`}
                                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                                    >
                                      <Eye className="w-4 h-4" />
                                      View
                                    </Link>
                                    <button
                                      onClick={() => handleRemove(product.id)}
                                      disabled={removing === product.id}
                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      aria-label="Remove from wishlist"
                                    >
                                      {removing === product.id ? (
                                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Trash2 className="w-5 h-5" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sidebar - Summary and Recommendations */}
           <div className="space-y-6 xl:sticky xl:top-24 h-fit">

                {/* Wishlist Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Wishlist Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Items</span>
                      <span className="font-medium">{wishlistCount}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Current Value</span>
                      <span className="font-medium">
                        ${wishlist.reduce((sum, item) => {
                          const product = getProductDetails(item.id);
                          return sum + (product?.price || 0);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>You Save</span>
                      <span className="font-medium text-green-600">
                        ${wishlist.reduce((sum, item) => {
                          const product = getProductDetails(item.id);
                          if (!product || !product.originalPrice) return sum;
                          return sum + (product.originalPrice - product.price);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total Value</span>
                        <span>
                          ${wishlist.reduce((sum, item) => {
                            const product = getProductDetails(item.id);
                            return sum + (product?.originalPrice || product?.price || 0);
                          }, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#8B0035]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Secure Shopping</p>
                        <p className="text-xs text-gray-500">Your wishlist is private and secure</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">You might also like</h3>
                  <div className="space-y-4">
                    {Object.values(products)
                      .filter(p => !wishlist.some(item => item.id === p.slug))
                      .slice(0, 2)
                      .map((product) => (
                        <div key={product.slug} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {product.name}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-sm font-bold text-[#8B0035]">
                               ${product.pricing 
  ? product.pricing[0].price.toFixed(2) 
  : Number(product.price ?? 0).toFixed(2)}

                              </span>
                              <Link
                                href={`/products/${product.slug}`}
                                className="text-xs text-[#8B0035] font-medium hover:underline"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Link
                    href="/products"
                    className="w-full mt-4 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    View All Products
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}