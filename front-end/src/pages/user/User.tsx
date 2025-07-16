import React, { useState } from "react";
import { useNavigate } from "react-router";

// Mock data based on backend/src/api/user/dto/user-response.dto.ts
const mockUsers = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    phoneNumber: "1234567890",
    address: "123 Main St",
    dateOfBirth: "1990-01-01",
    bio: "Frontend developer",
    name: "Alice Smith",
    avatar: null,
    role: { id: "r1", name: "Admin" },
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-05T12:00:00Z",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    phoneNumber: "0987654321",
    address: "456 Elm St",
    dateOfBirth: "1985-05-15",
    bio: "Backend developer",
    name: "Bob Johnson",
    avatar: null,
    role: { id: "r2", name: "User" },
    createdAt: "2024-06-02T11:00:00Z",
    updatedAt: "2024-06-06T14:00:00Z",
  },
];

const UserList = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchUser = (value: string) => {
    setSearch(value);
    if (!value) {
      setUsers(mockUsers);
    } else {
      setUsers(
        mockUsers.filter(
          (user) =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white m-8 rounded-lg shadow border border-gray-200">
        <div className="px-6 pt-4 pb-2 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 gap-4">
          <h2 className="text-lg font-semibold text-gray-800">User List</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <input
              type="text"
              className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              placeholder="Search by username, email, etc."
              value={search}
              onChange={(e) => searchUser(e.target.value)}
            />

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
              onClick={() => navigate("/add-user")}
            >
              New User
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm">
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
                          onClick={() => navigate("/update-user/" + user.id)}
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
                          onClick={() => handleDeleteUser(user.id)}
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
