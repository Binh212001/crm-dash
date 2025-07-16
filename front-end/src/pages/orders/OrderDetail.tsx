import React from "react";

const OrderDetail: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order #</h2>
      <div className="mb-4 flex items-center gap-2">
        <span className="font-semibold">Status:</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Customer:</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Total:</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Created At:</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Notes:</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Shipping Address:</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Billing Address:</span>
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
            <tr>
              <td colSpan={3} className="px-4 py-2 text-center">
                No items in this order.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
