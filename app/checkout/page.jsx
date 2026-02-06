'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { useAuth } from '@/app/context/AuthContext';
import { 
  ArrowLeft, 
  CreditCard, 
  MapPin, 
  Package, 
  User,
  Truck,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit2,
  Save,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [addressErrors, setAddressErrors] = useState({});
  
  // User address state
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [saveAddress, setSaveAddress] = useState(true);

  // Calculate totals
const getPrice = (price) =>
  typeof price === 'string' ? Number(price.replace('$', '')) : Number(price);

const subtotal = cartItems.reduce(
  (sum, item) => sum + getPrice(item.price) * item.qty,
  0
);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Validate address fields
  const validateAddress = () => {
    const errors = {};
    const requiredFields = ['fullName', 'phone', 'email', 'street', 'city', 'state', 'zipCode'];
    
    requiredFields.forEach(field => {
      if (!address[field]?.trim()) {
        errors[field] = 'This field is required';
      }
    });

    // Email validation
    if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation - exactly 10 digits
    if (address.phone) {
      const phoneDigits = address.phone.replace(/\D/g, ''); // Remove non-digit characters
      if (!/^\d{10}$/.test(phoneDigits)) {
        errors.phone = 'Please enter exactly 10-digit mobile number';
      }
    }

    // ZIP code validation - exactly 6 digits
    if (address.zipCode) {
      const zipDigits = address.zipCode.replace(/\D/g, ''); // Remove non-digit characters
      if (!/^\d{6}$/.test(zipDigits)) {
        errors.zipCode = 'Please enter exactly 6-digit ZIP code';
      }
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Check if form is valid
  useEffect(() => {
    const isAddressValid = validateAddress();
    const isPaymentSelected = !!paymentMethod;
    setIsFormValid(isAddressValid && isPaymentSelected);
  }, [address, paymentMethod]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    if (name === 'phone') {
      // Remove all non-digits
      let digits = value.replace(/\D/g, '');
      // Limit to 10 digits
      digits = digits.slice(0, 10);
      // Format as (XXX) XXX-XXXX
      let formatted = '';
      if (digits.length > 0) formatted = digits;
      if (digits.length >= 4) formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      if (digits.length >= 7) formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      setAddress(prev => ({ ...prev, [name]: formatted }));
    }
    // Format ZIP code as user types
    else if (name === 'zipCode') {
      // Remove all non-digits
      let digits = value.replace(/\D/g, '');
      // Limit to 6 digits
      digits = digits.slice(0, 6);
      setAddress(prev => ({ ...prev, [name]: digits }));
    }
    else {
      setAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveAddress = () => {
    if (validateAddress()) {
      setIsEditingAddress(false);
    }
  };

  const handlePlaceOrder = () => {
    // Final validation before placing order
    const isAddressValid = validateAddress();
    
    if (!isAddressValid) {
      alert('Please fill all required address fields correctly');
      return;
    }
    
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    
    // Generate order data
    const orderData = {
      orderId: `EDP${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      address: { ...address },
      paymentMethod: paymentMethod,
      cartItems: cartItems,
      subtotal: subtotal.toFixed(2),
      shipping: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`,
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Store order data in localStorage
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      
      // Redirect to success page with order data
      setTimeout(() => {
        router.push('/checkout/success');
      }, 2000);
    }, 1500);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add items to your cart before checking out
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Cart", href: "/cart" },
          { name: "Checkout", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Order Placed Success */}
          {orderPlaced && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Order Placed Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your order has been confirmed. Redirecting to order details...
                </p>
                <div className="w-12 h-12 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-[#8B0035]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Checkout Summary
            </h1>
            <p className="text-gray-600">
              Review your order and complete your purchase
            </p>
            
            {/* Validation Alert */}
            {!isFormValid && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto">
                <p className="text-amber-800 text-sm font-medium">
                  ⚠️ Please complete your shipping address and select a payment method to place your order.
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details & Address */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-[#8B0035]" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#8B0035]">
                       ${(getPrice(item.price) * item.qty).toFixed(2)}

                        </div>
                        <div className="text-sm text-gray-500">
                         ${getPrice(item.price).toFixed(2)} each

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#8B0035]" />
                    <h2 className="text-xl font-bold text-gray-900">
                      Delivery Address
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="flex items-center gap-1 text-sm text-[#8B0035] font-medium hover:text-[#6b0028]"
                  >
                    {isEditingAddress ? (
                      <>
                        <X className="w-4 h-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4" />
                        {address.fullName ? 'Edit Address' : 'Add Address'}
                      </>
                    )}
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={address.fullName}
                          onChange={handleAddressChange}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 ${
                            addressErrors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                          required
                          style={{ color: 'black' }} // Ensure text is black
                        />
                        {addressErrors.fullName && (
                          <p className="mt-1 text-sm text-red-600">{addressErrors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={address.phone}
                          onChange={handleAddressChange}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 ${
                            addressErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123-456-7890"
                          required
                          maxLength={12} // 10 digits + 2 hyphens
                          style={{ color: 'black' }}
                        />
                        {addressErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{addressErrors.phone}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          Format: XXX-XXX-XXXX (10 digits)
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={address.email}
                        onChange={handleAddressChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 ${
                          addressErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                        required
                        style={{ color: 'black' }}
                      />
                      {addressErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{addressErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={handleAddressChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 mb-2 ${
                          addressErrors.street ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123 Healthcare Street"
                        required
                        style={{ color: 'black' }}
                      />
                      {addressErrors.street && (
                        <p className="mt-1 text-sm text-red-600">{addressErrors.street}</p>
                      )}
                      <input
                        type="text"
                        name="apartment"
                        value={address.apartment}
                        onChange={handleAddressChange}
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                        style={{ color: 'black' }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 ${
                            addressErrors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="New York"
                          required
                          style={{ color: 'black' }}
                        />
                        {addressErrors.city && (
                          <p className="mt-1 text-sm text-red-600">{addressErrors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleAddressChange}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 ${
                            addressErrors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="NY"
                          required
                          style={{ color: 'black' }}
                        />
                        {addressErrors.state && (
                          <p className="mt-1 text-sm text-red-600">{addressErrors.state}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={address.zipCode}
                          onChange={handleAddressChange}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900 ${
                            addressErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123456"
                          required
                          maxLength={6}
                          style={{ color: 'black' }}
                        />
                        {addressErrors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">{addressErrors.zipCode}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          6 digits only
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setIsEditingAddress(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveAddress}
                        className="px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Save Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {address.fullName ? (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-[#8B0035]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{address.fullName}</h3>
                            <p className="text-gray-600">{address.phone}</p>
                            <p className="text-gray-600">{address.email}</p>
                          </div>
                        </div>

                        <div className="border-l-2 border-[#8B0035] pl-4 ml-5">
                          <p className="font-medium text-gray-900">{address.street}</p>
                          {address.apartment && (
                            <p className="text-gray-600">{address.apartment}</p>
                          )}
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          <input
                            type="checkbox"
                            id="saveAddress"
                            checked={saveAddress}
                            onChange={(e) => setSaveAddress(e.target.checked)}
                            className="w-4 h-4 text-[#8B0035] border-gray-300 rounded focus:ring-[#8B0035]"
                          />
                          <label htmlFor="saveAddress" className="text-sm text-gray-700">
                            Save this address for future orders
                          </label>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 mb-4">
                          Please add your shipping address to continue
                        </p>
                        <button
                          onClick={() => setIsEditingAddress(true)}
                          className="text-[#8B0035] font-medium hover:text-[#6b0028]"
                        >
                          + Add Address
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-[#8B0035]" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Method *
                  </h2>
                </div>

                {!paymentMethod && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-sm">
                      Please select a payment method to continue
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {[
                    {
                      id: 'credit_card',
                      name: 'Credit/Debit Card',
                      description: 'Pay with Visa, Mastercard, or American Express'
                    },
                    {
                      id: 'paypal',
                      name: 'PayPal',
                      description: 'Pay with your PayPal account'
                    },
                    {
                      id: 'apple_pay',
                      name: 'Apple Pay',
                      description: 'Pay securely with Apple Pay'
                    },
                    {
                      id: 'google_pay',
                      name: 'Google Pay',
                      description: 'Pay securely with Google Pay'
                    },
                    {
                      id: 'cash_on_delivery',
                      name: 'Cash on Delivery',
                      description: 'Pay when you receive your order'
                    }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-[#8B0035] bg-[#8B0035]/5'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 text-[#8B0035] focus:ring-[#8B0035]"
                        required
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Order Total Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Order Total
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#8B0035]">
                            ${total.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Including all taxes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid || isProcessing || orderPlaced}
                    className="w-full py-3.5 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Order...
                      </>
                    ) : orderPlaced ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Order Placed!
                      </>
                    ) : !isFormValid ? (
                      'Complete Address & Payment'
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Place Order
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    By placing your order, you agree to our{' '}
                    <Link href="/terms" className="text-[#8B0035] hover:underline">
                      Terms of Service
                    </Link>
                  </p>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-5 h-5 text-[#8B0035]" />
                    <h3 className="font-bold text-gray-900">Delivery Information</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        Estimated delivery: 2-3 business days
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        Package tracking available
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        Discreet packaging
                      </span>
                    </div>
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-[#8B0035]" />
                    <h3 className="font-bold text-gray-900">Need Help?</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact our support team for any questions about your order
                  </p>
                  <div className="space-y-2">
                    <a href="tel:+18001234567" className="block text-sm text-[#8B0035] hover:underline">
                      📞 +1 (800) 123-4567
                    </a>
                    <a href="mailto:support@edpharma.com" className="block text-sm text-[#8B0035] hover:underline">
                      ✉️ support@edpharma.com
                    </a>
                  </div>
                </div>

                {/* Back to Cart */}
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 text-[#8B0035] font-medium hover:text-[#6b0028] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}