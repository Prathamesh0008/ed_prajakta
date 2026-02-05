// app/account/orders/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { useAuth } from '@/app/context/AuthContext';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  DollarSign,
  ShoppingBag,
  MapPin,
  CreditCard,
  Phone,
  RefreshCw,
  X,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const router = useRouter();
  const { user, getUserOrders } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    } else {
      loadUserOrders();
    }
  }, [user, router]);

  const loadUserOrders = () => {
    setLoading(true);
    setError('');
    
    try {
      // Get REAL orders from localStorage
      const userOrders = getUserOrders();
      
      if (userOrders && Array.isArray(userOrders)) {
        // Sort orders by date (newest first)
        const sortedOrders = [...userOrders].sort((a, b) => 
          new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
        );
        
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } else {
        setOrders([]);
        setFilteredOrders([]);
      }
    } catch (err) {
      setError('Failed to load orders. Please try again.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = orders;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.itemsDetails?.some(item => 
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchQuery, statusFilter, orders]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-orange-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    if (!status) return 'Pending';
    
    switch(status.toLowerCase()) {
      case 'delivered': return 'Delivered';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'cancelled': return 'Cancelled';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹0.00';
    
    // Remove any non-numeric characters except decimal point
    const numericAmount = parseFloat(amount.toString().replace(/[^0-9.-]+/g, ''));
    
    if (isNaN(numericAmount)) return '₹0.00';
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(numericAmount);
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handleReorder = (order) => {
    // In real app, add items to cart
    if (order.itemsDetails && order.itemsDetails.length > 0) {
      alert(`Adding ${order.itemsDetails.length} items from order ${order.id || order.orderId} to cart`);
      // Here you would dispatch to cart context
    } else {
      alert('No items found in this order');
    }
  };

  const handleDownloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}`);
    // In real app, this would trigger a PDF download
  };

  const handleRetryLoad = () => {
    loadUserOrders();
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
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
          { name: "Account", href: "/account" },
          { name: "My Orders", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  My Orders
                </h1>
                <p className="text-gray-600">
                  View and manage all your orders in one place
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700">{error}</p>
                </div>
                <button
                  onClick={handleRetryLoad}
                  className="text-sm text-[#8B0035] font-medium hover:underline"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Filters and Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by order ID or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none text-gray-900"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Orders
                  </button>
                  <button
                    onClick={() => setStatusFilter('delivered')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      statusFilter === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => setStatusFilter('processing')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      statusFilter === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => setStatusFilter('shipped')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      statusFilter === 'shipped'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Shipped
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'No orders found' 
                    : 'No orders yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter' 
                    : 'Start shopping to see your orders here'}
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Start Shopping
                </Link>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <div key={order.id || order.orderId || index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">
                            Order #{order.id || order.orderId || `ORD-${index + 1}`}
                          </h3>
                          {order.status && (
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-2">{getStatusText(order.status)}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.date || order.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{order.items || order.itemsDetails?.length || 0} item{(order.items || order.itemsDetails?.length || 0) !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-medium text-gray-900">
                              {formatCurrency(order.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewOrderDetails(order)}
                          className="flex items-center gap-2 px-4 py-2.5 text-[#8B0035] font-medium hover:bg-[#8B0035]/5 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  {order.itemsDetails && order.itemsDetails.length > 0 && (
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Order Items */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                          <div className="space-y-3">
                            {order.itemsDetails.slice(0, 2).map((item, idx) => (
                              <div key={item.id || idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                  {item.image ? (
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <Package className="w-6 h-6 text-gray-500" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{item.name || 'Product'}</p>
                                  <p className="text-sm text-gray-600">
                                    {item.quantity || 1} × {formatCurrency(item.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {order.itemsDetails.length > 2 && (
                              <div className="text-center">
                                <button
                                  onClick={() => handleViewOrderDetails(order)}
                                  className="text-[#8B0035] font-medium hover:underline text-sm"
                                >
                                  + {order.itemsDetails.length - 2} more items
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <p className="text-gray-600">
                  Order #{selectedOrder.id || selectedOrder.orderId}
                </p>
              </div>
              <button
                onClick={handleCloseOrderDetails}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Order Summary */}
                <div className="space-y-6">
                  {/* Order Status */}
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Order Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status</span>
                        {selectedOrder.status ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                            {getStatusIcon(selectedOrder.status)}
                            <span className="ml-2">{getStatusText(selectedOrder.status)}</span>
                          </span>
                        ) : (
                          <span className="text-gray-900">Not available</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(selectedOrder.date || selectedOrder.createdAt)}
                        </span>
                      </div>
                      {selectedOrder.estimatedDelivery && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Estimated Delivery</span>
                          <span className="font-medium text-gray-900">
                            {formatDate(selectedOrder.estimatedDelivery)}
                          </span>
                        </div>
                      )}
                      {selectedOrder.trackingNumber && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tracking Number</span>
                          <span className="font-medium text-gray-900">{selectedOrder.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {selectedOrder.shippingAddress && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Shipping Address</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedOrder.shippingAddress.fullName || selectedOrder.shippingAddress.name || 'Not specified'}
                            </p>
                            {selectedOrder.shippingAddress.street && (
                              <p className="text-gray-600">{selectedOrder.shippingAddress.street}</p>
                            )}
                            {selectedOrder.shippingAddress.city && selectedOrder.shippingAddress.state && (
                              <p className="text-gray-600">
                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                              </p>
                            )}
                            {selectedOrder.shippingAddress.phone && (
                              <div className="flex items-center gap-2 mt-1">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{selectedOrder.shippingAddress.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Order Items & Payment */}
                <div className="space-y-6">
                  {/* Order Items */}
                  {selectedOrder.itemsDetails && selectedOrder.itemsDetails.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="font-bold text-gray-900">
                          Order Items ({selectedOrder.itemsDetails.length})
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                        {selectedOrder.itemsDetails.map((item, idx) => (
                          <div key={item.id || idx} className="p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                {item.image ? (
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <Package className="w-8 h-8 text-gray-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.name || 'Product'}</h4>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-gray-600">
                                    Quantity: {item.quantity || 1}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {formatCurrency(item.price)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Summary */}
                  <div className="bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Payment Summary</h3>
                    <div className="space-y-3">
                      {selectedOrder.paymentMethod && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Payment Method</span>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-900">
                              {selectedOrder.paymentMethod === 'credit_card' ? 'Credit Card' : 
                               selectedOrder.paymentMethod === 'upi' ? 'UPI' : 
                               selectedOrder.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 
                               selectedOrder.paymentMethod === 'paypal' ? 'PayPal' : 
                               selectedOrder.paymentMethod?.replace('_', ' ').toUpperCase() || 'Online Payment'}
                            </span>
                          </div>
                        </div>
                      )}
                      {selectedOrder.subtotal && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900">{formatCurrency(selectedOrder.subtotal)}</span>
                        </div>
                      )}
                      {selectedOrder.shipping && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className={selectedOrder.shipping === 'Free' || selectedOrder.shipping === 'FREE' ? 'text-green-600' : 'text-gray-900'}>
                            {selectedOrder.shipping}
                          </span>
                        </div>
                      )}
                      {selectedOrder.tax && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="text-gray-900">{formatCurrency(selectedOrder.tax)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">Total Amount</span>
                          <span className="text-2xl font-bold text-[#8B0035]">
                            {formatCurrency(selectedOrder.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleReorder(selectedOrder)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Reorder All Items
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(selectedOrder.id || selectedOrder.orderId)}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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