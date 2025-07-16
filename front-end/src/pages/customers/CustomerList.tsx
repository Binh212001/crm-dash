import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  deleteCustomer,
  getCustomers,
  type Customer,
} from "@/services/customer/customer.action";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CustomerList = () => {
  const [search, setSearch] = useState("");
  const [pageParams, setPageParams] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 10,
    }
  );
  const navigate = useNavigate();

  const { customers, pagination, loading } = useAppSelector(
    (state) => state.customers
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getCustomers({
        q: search,
        ...pageParams,
      })
    );
  }, [search, pageParams.page, pageParams.limit, dispatch]);

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

  const handleDelete = (id: string | undefined) => {
    if (id) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white m-8 rounded-lg shadow border border-gray-200">
        <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Customer List</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search customer name"
              className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              style={{ minWidth: 220 }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => navigate("/add-customer")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
            >
              New Customer
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm">
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Orders</th>
                <th className="px-4 py-3 text-left font-medium">Total Spent</th>
                <th className="px-4 py-3 text-left font-medium">City</th>
                <th className="px-4 py-3 text-left font-medium">Last Seen</th>
                <th className="px-4 py-3 text-left font-medium">Last Order</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : customers && customers.length > 0 ? (
                customers.map((customer: Customer) => (
                  <tr key={customer.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">
                        {customer.name}
                      </div>
                    </td>
                    <td className="px-4 py-3">{customer.email}</td>
                    <td className="px-4 py-3">{customer.ordersCount ?? "-"}</td>
                    <td className="px-4 py-3">
                      {customer.totalSpent ? `$${customer.totalSpent}` : "-"}
                    </td>
                    <td className="px-4 py-3">{customer.city || "-"}</td>
                    <td className="px-4 py-3">
                      {customer.lastSeen
                        ? new Date(customer.lastSeen).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {customer.lastOrder
                        ? new Date(customer.lastOrder).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:underline text-sm mr-2">
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline text-sm"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-400">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
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

export default CustomerList;
