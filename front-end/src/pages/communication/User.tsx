import React from "react";
import { useGetUsersQuery } from "../../service/user.service";

const UserList = () => {
  const { data, isLoading } = useGetUsersQuery();
  const users = data?.data || [];
  const pagination = data?.pagination || {
    limit: 10,
    currentPage: 1,
    totalRecords: 0,
    totalPages: 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white m-8 rounded-lg shadow border border-gray-200">
        <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">User List</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
            New User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm">
                <th className="px-4 py-3 text-left font-medium">Username</th>
                <th className="px-4 py-3 text-left font-medium">First Name</th>
                <th className="px-4 py-3 text-left font-medium">Last Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Created At</th>
                <th className="px-4 py-3 text-left font-medium">Updated At</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-800">{user.username}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {user.firstName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{user.lastName}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <svg
                            className="w-4 h-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination controls could go here if needed */}
      </div>
    </div>
  );
};

export default UserList;
