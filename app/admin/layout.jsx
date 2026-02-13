'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🔐 Protect Admin Routes
  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-[#8B0035] to-[#6b0028] text-white p-6 shadow-lg">

        <h1 className="text-2xl font-bold mb-10">
          ED Pharma <span className="text-[#F4C430]">Admin</span>
        </h1>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
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

      {/* Main */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
