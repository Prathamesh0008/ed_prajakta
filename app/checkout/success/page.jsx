'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import Link from 'next/link';
import { 
  CheckCircle, 
  Package, 
  Home, 
  ShoppingBag,
  Download,
  MapPin,
  CreditCard,
  User,
  Phone,
  Mail,
  Truck,
  Shield,
  Calendar
} from 'lucide-react';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Get order data from localStorage
    const storedOrder = localStorage.getItem('lastOrder');
    
    if (storedOrder) {
      const orderData = JSON.parse(storedOrder);
      
      // Format dates
      const orderDate = new Date(orderData.date);
      const estimatedDelivery = new Date(orderData.estimatedDelivery);
      
      setOrderDetails({
        ...orderData,
        date: orderDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        estimatedDelivery: estimatedDelivery.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        formattedDate: estimatedDelivery.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        }),
        itemsCount: orderData.cartItems?.length || 0
      });
      
      // Clear localStorage after reading (optional)
      // localStorage.removeItem('lastOrder');
    } else {
      // If no data, generate mock data
      setOrderDetails({
        orderId: `EDP${Date.now().toString().slice(-8)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        formattedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        }),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        itemsCount: 3,
        total: '$89.97',
        subtotal: '$82.77',
        shipping: 'Free',
        tax: '$7.20',
        address: {
          fullName: 'John Doe',
          phone: '+1 (555) 123-4567',
          email: 'john.doe@example.com',
          street: '123 Healthcare Street',
          apartment: 'Suite 456',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        },
        paymentMethod: 'credit_card',
        cartItems: []
      });
    }

    // Auto-redirect to home after 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handlePrintInvoice = () => {
    window.print();
  };

  const getPaymentMethodDisplay = (method) => {
    const methods = {
      credit_card: { name: 'Credit Card', description: 'Card payment' },
      paypal: { name: 'PayPal', description: 'Paid via PayPal' },
      apple_pay: { name: 'Apple Pay', description: 'Paid via Apple Pay' },
      google_pay: { name: 'Google Pay', description: 'Paid via Google Pay' },
      cash_on_delivery: { name: 'Cash on Delivery', description: 'Pay when delivered' }
    };
    return methods[method] || { name: 'Unknown', description: '' };
  };

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Checkout", href: "/checkout" },
          { name: "Order Confirmed", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 p-8 sm:p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Order Confirmed!
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Thank you for your purchase
              </p>
              {orderDetails && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <span className="text-sm text-gray-600">Order ID:</span>
                  <span className="font-bold text-[#8B0035]">{orderDetails.orderId}</span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              {/* Order Details Grid */}
              {orderDetails && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-[#8B0035]" />
                      <h3 className="font-bold text-gray-900">Order Date</h3>
                    </div>
                    <p className="text-gray-700">{orderDetails.date}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="w-5 h-5 text-[#8B0035]" />
                      <h3 className="font-bold text-gray-900">Estimated Delivery</h3>
                    </div>
                    <p className="text-gray-700">{orderDetails.estimatedDelivery}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="w-5 h-5 text-[#8B0035]" />
                      <h3 className="font-bold text-gray-900">Items Ordered</h3>
                    </div>
                    <p className="text-gray-700">{orderDetails.itemsCount} item{orderDetails.itemsCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              )}

              {/* Shipping & Payment Information */}
              {orderDetails?.address && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Shipping Address */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-[#8B0035]" />
                      <h3 className="text-lg font-bold text-gray-900">Shipping Address</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#8B0035]/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-[#8B0035]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{orderDetails.address.fullName}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            {orderDetails.address.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            {orderDetails.address.email}
                          </div>
                        </div>
                      </div>

                      <div className="border-l-2 border-[#8B0035] pl-4 ml-5">
                        <p className="font-medium text-gray-900">{orderDetails.address.street}</p>
                        {orderDetails.address.apartment && (
                          <p className="text-gray-600">{orderDetails.address.apartment}</p>
                        )}
                        <p className="text-gray-600">
                          {orderDetails.address.city}, {orderDetails.address.state} {orderDetails.address.zipCode}
                        </p>
                        <p className="text-gray-600">{orderDetails.address.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  {orderDetails?.paymentMethod && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="w-5 h-5 text-[#8B0035]" />
                        <h3 className="text-lg font-bold text-gray-900">Payment Information</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-[#8B0035]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getPaymentMethodDisplay(orderDetails.paymentMethod).name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getPaymentMethodDisplay(orderDetails.paymentMethod).description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Status</span>
                            <span className="font-medium text-green-600">✓ Paid</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount Paid</span>
                            <span className="font-bold text-[#8B0035]">{orderDetails.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Order Summary */}
              {orderDetails && (
                <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${orderDetails.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">{orderDetails.shipping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${orderDetails.tax}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[#8B0035]">
                            {orderDetails.total}
                          </div>
                          <div className="text-sm text-gray-500">
                            Paid in full
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  What happens next?
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Order Processing",
                      description: "We're preparing your medications with care."
                    },
                    {
                      step: "2",
                      title: "Quality Check",
                      description: "Your order undergoes thorough quality verification."
                    },
                    {
                      step: "3",
                      title: "Dispatch & Shipping",
                      description: "Your package will be shipped with tracking details."
                    },
                    {
                      step: "4",
                      title: "Delivery",
                      description: `Receive your order by ${orderDetails?.formattedDate || '2-3 business days'}.`
                    }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Link
                  href="/account/orders"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5" />
                  View Order Details
                </Link>
                
                <button
                  onClick={handlePrintInvoice}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Invoice
                </button>
              </div>

              {/* Share & Continue */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-600">
                      Redirecting to homepage in {countdown} seconds...
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      href="/products"
                      className="flex items-center gap-2 text-[#8B0035] font-medium hover:text-[#6b0028] transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Continue Shopping
                    </Link>
                    
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-[#8B0035] font-medium hover:text-[#6b0028] transition-colors"
                    >
                      <Home className="w-4 h-4" />
                      Go to Homepage
                    </Link>
                  </div>
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