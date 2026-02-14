//app\admin\orders\page.jsx
'use client';

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("edpharma_token");

    const res = await fetch("/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (data.success) setOrders(data.orders);

    setLoading(false);
  };

const updateStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("edpharma_token");

    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    const data = await res.json();

    if (!data.success) {
      alert("Failed to update status");
      return;
    }

    // 🔥 Update UI instantly without refetch
    setOrders(prev =>
      prev.map(order =>
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

  } catch (error) {
    console.error("Update error:", error);
  }
};


  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">

    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
      Order Management
    </h2>

    <div className="space-y-6">
      {orders.map(order => (
        <div
          key={order._id}
          className="bg-white rounded-2xl shadow border border-gray-200 p-4 sm:p-6"
        >

          {/* Top Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">

            {/* Order Info */}
            <div>
              <p className="font-semibold text-gray-900 text-base sm:text-lg">
                Order #{order.orderId || order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500 break-all">
                {order.user?.firstName} {order.user?.lastName}
                <span className="hidden sm:inline"> — </span>
                <span className="block sm:inline">{order.user?.email}</span>
              </p>
            </div>

            {/* Status + Price */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:gap-4 w-full sm:w-auto">

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#8B0035]"
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <span className="font-bold text-[#8B0035] text-lg sm:text-base">
                €{Number(order.total).toFixed(2)}
              </span>

            </div>
          </div>

          {/* Items */}
          <div className="border-t pt-4">
            <p className="font-semibold mb-2 text-gray-700">
              Items:
            </p>

            {order.items?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-600 mb-1 flex-wrap"
              >
                <span className="break-words">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Address */}
          <div className="border-t pt-4 mt-4">
            <p className="font-semibold text-gray-700 mb-1">
              Shipping Address:
            </p>

            <div className="text-sm text-gray-600 space-y-1">
              <p>{order.shippingAddress?.fullName}</p>
              <p className="break-words">
                {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </p>
              <p>{order.shippingAddress?.phone}</p>
            </div>
          </div>

          <div className="mt-4 text-xs sm:text-sm text-gray-400">
            {new Date(order.createdAt).toLocaleString()}
          </div>

        </div>
      ))}
    </div>
  </div>
);

}












