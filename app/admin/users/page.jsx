//app\admin\users\page.jsx
'use client';

import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("edpharma_token");

      const res = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  const getRoleStyle = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-700"
      : "bg-gray-100 text-gray-700";
  };

return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">

    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
      All Users
    </h2>

    {loading ? (
      <div className="text-center py-10">
        <div className="w-10 h-10 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    ) : users.length === 0 ? (
      <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
        No users found.
      </div>
    ) : (
      <>
        {/* ✅ Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl shadow border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Phone</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Role</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="p-4 text-gray-700 break-all">
                    {user.email}
                  </td>

                  <td className="p-4 text-gray-700">
                    {user.phone || "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500 break-all">
                    {user.email}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleStyle(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium text-gray-800">Phone:</span>{" "}
                  {user.phone || "-"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Joined:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

}
