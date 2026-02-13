'use client';

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("edpharma_token");

      const res = await fetch("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        All Orders
      </h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow border overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Total</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-900">
                    {order.orderId || order._id.slice(-6)}
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-gray-900">
                      {order.user?.firstName} {order.user?.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.user?.email}
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-[#8B0035]">
                    ${Number(order.total).toFixed(2)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        order.status || "processing"
                      )}`}
                    >
                      {order.status || "processing"}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </>
  );
}
