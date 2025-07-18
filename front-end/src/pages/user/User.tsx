import { useAppDispatch } from "@/app/hook";
import type { RootState } from "@/app/store";
import { deleteUser, getUsers } from "@/services/user/user.action";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [pageParams, setPageParams] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 10,
    }
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users, loading, pagination } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(
      getUsers({
        q: search,
        ...pageParams,
      })
    );
  }, [dispatch, search]);

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handlePageChange = (newPage: number) => {
    setPageParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageParams({
      page: 1,
      limit: Number(e.target.value),
    });
  };

  // Filter users by search (on name or email)
  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  });

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
              onChange={(e) => setSearch(e.target.value)}
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
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Created At</th>
                <th className="px-4 py-3 text-left font-medium">Updated At</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-gray-700">{user.name}</td>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination controls could go here if needed */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-600">
              Page {pagination?.currentPage || 1} of{" "}
              {pagination?.totalPages || 1}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() =>
                handlePageChange((pagination?.currentPage || 1) - 1)
              }
              disabled={!pagination || pagination.currentPage <= 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() =>
                handlePageChange((pagination?.currentPage || 1) + 1)
              }
              disabled={
                !pagination || pagination.currentPage >= pagination.totalPages
              }
            >
              Next
            </button>
            <select
              className="ml-2 px-2 py-1 border rounded text-sm"
              value={pageParams.limit}
              onChange={handleLimitChange}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
