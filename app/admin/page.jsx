'use client';

import { useEffect, useState } from "react";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
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
    };

    fetchStats();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Admin Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h3 className="text-2xl font-bold text-[#8B0035] mt-2">
            {stats.totalOrders}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h3 className="text-2xl font-bold text-[#8B0035] mt-2">
            {stats.totalUsers}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-2xl font-bold text-[#8B0035] mt-2">
            ${Number(stats.totalRevenue).toFixed(2)}
          </h3>
        </div>

      </div>
    </>
  );
}
