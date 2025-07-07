import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "@/services/order.service";

const getStatusBadge = (status: string) => {
  let colorClass = "";
  switch (status) {
    case "completed":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "processing":
      colorClass = "bg-blue-100 text-blue-800";
      break;
    case "pending":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "cancelled":
      colorClass = "bg-red-100 text-red-800";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800";
  }
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${colorClass}`}
    >
      {status}
    </span>
  );
};

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useGetOrderQuery(id || "");

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
        <p className="text-red-600">Order not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order #{order.orderNumber}</h2>
      <div className="mb-4 flex items-center gap-2">
        <span className="font-semibold">Status:</span>
        {getStatusBadge(order.status)}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Customer:</span>{" "}
        {order.customer?.name || "N/A"}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Total:</span> $
        {order.total?.toFixed(2) ?? "0.00"}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Created At:</span>{" "}
        {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Notes:</span> {order.notes || "N/A"}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Shipping Address:</span>{" "}
        {order.shippingAddress || "N/A"}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Billing Address:</span>{" "}
        {order.billingAddress || "N/A"}
      </div>
      <div className="mb-6">
        <span className="font-semibold">Order Items:</span>
        <table className="min-w-full mt-2 border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Product</th>
              <th className="px-4 py-2 border-b text-left">Quantity</th>
              <th className="px-4 py-2 border-b text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border-b">
                    {item.product?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">{item.quantity}</td>
                  <td className="px-4 py-2 border-b">${item.product?.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center">
                  No items in this order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
