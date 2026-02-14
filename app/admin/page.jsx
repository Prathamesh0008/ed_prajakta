'use client';

import { useEffect, useState } from "react";
import { Users, ShoppingCart, IndianRupee } from "lucide-react";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("edpharma_token");

        const res = await fetch("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (data.success) {
          setStats({
            totalUsers: data.totalUsers,
            totalOrders: data.totalOrders,
            totalRevenue: data.totalRevenue
          });
        }
      } catch (err) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Page Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Admin Dashboard
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Orders */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow border border-gray-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">
              Total Orders
            </p>
            <ShoppingCart className="w-6 h-6 text-[#8B0035]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#8B0035] mt-4">
            {stats.totalOrders}
          </h3>
        </div>

        {/* Users */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow border border-gray-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">
              Total Users
            </p>
            <Users className="w-6 h-6 text-[#8B0035]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#8B0035] mt-4">
            {stats.totalUsers}
          </h3>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow border border-gray-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm font-medium">
              Total Revenue
            </p>
            <IndianRupee className="w-6 h-6 text-[#8B0035]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#8B0035] mt-4">
            €{Number(stats.totalRevenue).toFixed(2)}
          </h3>
        </div>

      </div>

    </div>
  );
}
