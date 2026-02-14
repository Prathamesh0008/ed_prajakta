'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  ShoppingCart,
  Package,
  IndianRupee
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== 'admin') {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#8B0035]">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Welcome back, {user.firstName}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200">
          <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#8B0035] mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold">Total Users</h3>
          <p className="text-xl sm:text-2xl font-bold text-[#8B0035] mt-2">--</p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200">
          <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-[#8B0035] mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold">Total Orders</h3>
          <p className="text-xl sm:text-2xl font-bold text-[#8B0035] mt-2">--</p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200">
          <Package className="w-7 h-7 sm:w-8 sm:h-8 text-[#8B0035] mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold">Products</h3>
          <p className="text-xl sm:text-2xl font-bold text-[#8B0035] mt-2">--</p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200">
          <IndianRupee className="w-7 h-7 sm:w-8 sm:h-8 text-[#8B0035] mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold">Revenue</h3>
          <p className="text-xl sm:text-2xl font-bold text-[#8B0035] mt-2">--</p>
        </div>

      </div>

      {/* Quick Links */}
      <div className="mt-8 sm:mt-10 bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-[#8B0035] mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          <a
            href="/admin/orders"
            className="w-full sm:w-auto text-center px-6 py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            View Orders
          </a>

          <a
            href="/admin/users"
            className="w-full sm:w-auto text-center px-6 py-3 border border-[#8B0035] text-[#8B0035] rounded-lg font-semibold hover:bg-[#8B0035] hover:text-white transition"
          >
            Manage Users
          </a>

        </div>
      </div>

    </div>
  );
}
