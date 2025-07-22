import axiosInstance from "@/app/axiosInstance";
import type { AppDispatch, RootState } from "@/app/store";
import type { Order } from "@/services/order/order.action";
import { getOrders } from "@/services/order/order.action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import OrderOverview from "./OrderOverview";

const OrderLists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((state: RootState) => ({
    orders: state.orders.orders,
    loading: state.orders.loading,
  }));

  // State for popup confirmation
  const [confirmStatus, setConfirmStatus] = useState<{
    orderId: string | null;
    newStatus: string | null;
  }>({ orderId: null, newStatus: null });

  useEffect(() => {
    dispatch(getOrders({}));
  }, [dispatch]);

  // Handler for status change (show popup)
  const handleChangeStatus = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    const newStatus = e.target.value;
    setConfirmStatus({ orderId: id, newStatus });
  };

  const handleConfirmStatus = async () => {
    if (!confirmStatus.orderId || !confirmStatus.newStatus) return;
    try {
      await axiosInstance.put(`/orders/${confirmStatus.orderId}/status`, {
        status: confirmStatus.newStatus,
      });
      dispatch(getOrders({}));
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Cập nhật trạng thái đơn hàng thất bại!");
    }
    setConfirmStatus({ orderId: null, newStatus: null });
  };

  // Handler for cancelling status change
  const handleCancelStatus = () => {
    setConfirmStatus({ orderId: null, newStatus: null });
  };

  return (
    <div className="p-6">
      <ToastContainer />
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
                  placeholder="Select date"
                />
                <select className="px-3 py-2 border border-gray-300 rounded text-sm bg-white">
                  <option value="">Order Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className=" px-4 py-2 text-sm text-pink-600 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100">
                  Reset Filter
                </button>
              </div>
              {/* Search */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                <>
                  {orders.map((order: Order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.customer?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleChangeStatus(e, order.id)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => navigate(`/order/detail/${order.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup xác nhận khi đổi trạng thái */}
      {confirmStatus.orderId && confirmStatus.newStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Xác nhận thay đổi trạng thái
            </h2>
            <p className="mb-6">
              Bạn có chắc chắn muốn đổi trạng thái đơn hàng này thành{" "}
              <span className="font-bold">{confirmStatus.newStatus}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleCancelStatus}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleConfirmStatus}
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
