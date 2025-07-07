import { useNavigate } from "react-router";
import {
  useGetOrdersQuery,
  type OrderItemResponseDto,
  type OrderResponseDto,
} from "../../services/order.service";
import OrderOverview from "./OrderOverview";
import { useState } from "react";

const OrderLists = () => {
  const navigate = useNavigate();

  // Popup state for status change confirmation
  const [statusPopup, setStatusPopup] = useState<{
    open: boolean;
    orderNumber?: string;
    currentStatus?: string;
    newStatus?: string;
  }>({ open: false });

  // Status filter state
  const [statusFilter, setStatusFilter] = useState('');
  // Date filter state
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');

  // Fetch orders from service
  const { data, isLoading, isError } = useGetOrdersQuery({
    page: 1,
    limit: 20,
    status: statusFilter,
    createdAt: dateFilter,
    search
  });
  const orders = data?.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "processing":
        return (
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
      case "pending":
        return (
          <svg
            className="w-5 h-5 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Handler for confirming status change
  const handleConfirmStatusChange = () => {
    // Here you would call your API to update the order status
    // For now, just close the popup and show an alert
    setStatusPopup({ open: false });
    alert(
      `Order status changed to: ${statusPopup.newStatus} (Order ID: ${statusPopup.orderNumber})`
    );
  };

  // Handler for cancelling status change
  const handleCancelStatusChange = () => {
    setStatusPopup({ open: false });
  };

  // Handler for resetting filters
  const handleResetFilter = () => {
    setStatusFilter('');
    setDateFilter('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Lists</h1>
      <OrderOverview />

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex gap-3">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 text-sm hover:bg-gray-100">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z"
                    />
                  </svg>
                  Filter By
                </button>
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  placeholder="Select date"
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Order Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  className=" px-4 py-2 text-sm text-pink-600 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100"
                  onClick={handleResetFilter}
                >
                  Reset Filter
                </button>
              </div>
              {/* Search */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                  onChange={(e)=>setSearch(e.target.value)}
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    style={{ minWidth: 250 }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                  onClick={() => navigate("/add-order")}
                >
                  New Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">
              Loading orders...
            </div>
          ) : isError ? (
            <div className="p-6 text-center text-red-500">
              Failed to load orders.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order: OrderResponseDto) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs">
                        {order.items &&
                          order.items.map(
                            (item: OrderItemResponseDto, index: number) => (
                              <div key={index} className="truncate">
                                {item.product?.name}
                              </div>
                            )
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.total?.toFixed(2) ?? "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Payment method is not available in API, so show N/A */}
                      N/A
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/order/detail/${order.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <select
                          className="ml-2 px-2 py-1 border border-gray-300 rounded text-xs"
                          value={order.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            if (newStatus !== order.status) {
                              setStatusPopup({
                                open: true,
                                orderNumber: order.orderNumber,
                                currentStatus: order.status,
                                newStatus,
                              });
                            }
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Popup xác nhận thay đổi trạng thái */}
      {statusPopup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Xác nhận thay đổi trạng thái
            </h2>
            <p className="mb-4">
              Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng
              <span className="font-bold mx-1">{statusPopup.orderNumber}</span>
              từ
              <span className="font-bold mx-1">
                {statusPopup.currentStatus}
              </span>
              sang
              <span className="font-bold mx-1">{statusPopup.newStatus}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleCancelStatusChange}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleConfirmStatusChange}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderLists;
