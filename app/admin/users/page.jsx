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
    <>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
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
        <div className="bg-white rounded-2xl shadow border overflow-x-auto">
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

                  <td className="p-4 text-gray-700">
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
      )}
    </>
  );
}
