'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔐 Protect Admin Routes
  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ✅ Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* ✅ Sidebar */}
    <aside
  className={`
    fixed lg:static z-50 top-0 left-0
    min-h-screen
    w-72 bg-gradient-to-b from-[#8B0035] to-[#6b0028]
    text-white p-6 shadow-lg
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">
            ED Pharma <span className="text-[#F4C430]">Admin</span>
          </h1>

          {/* Close Button (Mobile) */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-white/15 border border-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5 text-[#F4C430]" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar (Mobile Only) */}
        <header className="lg:hidden bg-white shadow-sm px-4 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-[#8B0035]" />
          </button>
          <h2 className="font-bold text-[#8B0035]">Admin Panel</h2>
          <div /> {/* spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
