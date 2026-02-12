//app\cart\page.jsx
'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { useCart } from '@/app/context/CartContext';
import products from '@/app/data/en';

import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  Package,
  Shield,
  Truck,
  CreditCard,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
const getTierPrice = (productSlug, quantity) => {
  const product = products[productSlug];

  if (!product) return 0;

  if (!product.pricing || product.pricing.length === 0) {
    return Number(product.price ?? 0);
  }

  const tier = product.pricing.find(
    (range) => quantity >= range.min && quantity <= range.max
  );

  return tier ? tier.price : product.pricing[0].price;
};

 const subtotal = cartItems.reduce((sum, item) => {
  const unitPrice = getTierPrice(item.id, item.qty);
  return sum + unitPrice * item.qty;
}, 0);


  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    window.location.href = '/checkout';
    // In a real app, you would redirect to checkout
    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
    }, 2000);
  };

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Cart", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-[#8B0035]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Your Shopping Cart
            </h1>
            <p className="text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Add some amazing healthcare products to get started with your order
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* Left Column - Cart Items */}
              <div className="lg:col-span-2">
                {/* Cart Items List */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        Cart Items ({cartItems.length})
                      </h2>
                      <button
                        onClick={clearCart}
                        className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
  const unitPrice = getTierPrice(item.id, item.qty);

  return (

                      <div key={item.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {item.prescriptionRequired && (
                              <div className="absolute -top-2 -left-2">
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                  Rx
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">

                              <div>
                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">

                              {/* Quantity Controls */}
                      <div className="flex items-center gap-1 sm:gap-2">

                                <button
                                  onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                                  className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                  disabled={item.qty <= 1}
                                >
                                  <Minus className="w-4 h-4 text-gray-600" />
                                </button>
                               <input
  type="number"
  min="1"
  value={item.qty}
  onChange={(e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      updateQty(item.id, value);
    }
  }}
  className="w-16 text-center text-gray-900 border border-gray-300 rounded-md py-1 font-medium"
/>

                                <button
                                  onClick={() => updateQty(item.id, item.qty + 1)}
                                  className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
  <div className="text-lg font-bold text-[#8B0035]">
        €{(unitPrice * item.qty).toFixed(2)}
      </div>
      <div className="text-sm text-gray-500">
       €{unitPrice.toFixed(2)} each
      </div>


                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  );
})}

                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8B0035]/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#8B0035]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Secure Payment</p>
                      <p className="text-xs text-gray-600">100% Safe & Secure</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8B0035]/10 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-[#8B0035]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Free Shipping</p>
                      <p className="text-xs text-gray-600">On orders over $50</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8B0035]/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#8B0035]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Easy Returns</p>
                      <p className="text-xs text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
               <div className="lg:sticky lg:top-6 space-y-6">

                  {/* Order Summary Card */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">€{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-gray-900">
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `€€{shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium text-gray-900">€{tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between">
                          <span className="text-lg font-bold text-gray-900">Total</span>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#8B0035]">
                             €{total.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              Including all taxes
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Proceed to Checkout
                          <CreditCard className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                      You'll be able to review your order before payment
                    </p>
                  </div>

                  {/* Continue Shopping */}
                  <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4">
                      Continue Shopping
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "Prescription Drugs", href: "/products/category/prescription" },
                        { name: "OTC Medicines", href: "/products/category/otc" },
                        { name: "Health Supplements", href: "/products/category/supplements" },
                        { name: "Personal Care", href: "/products/category/personal-care" }
                      ].map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{category.name}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                 {/* Coupon Code */}
<div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
  <h3 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">
    Have a coupon code?
  </h3>

  <div className="flex flex-col sm:flex-row gap-2">
    <input
      type="text"
      placeholder="Enter code"
      className="w-full sm:flex-1 px-4 py-3 sm:py-2
        border border-gray-300 rounded-lg
        text-sm sm:text-base
        focus:ring-2 focus:ring-[#8B0035]
        focus:border-[#8B0035]
        outline-none"
    />

    <button
      className="w-full sm:w-auto px-4 py-3 sm:py-2
        bg-gray-100 text-gray-700 font-medium rounded-lg
        hover:bg-gray-200 transition-colors"
    >
      Apply
    </button>
  </div>
</div>

                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}