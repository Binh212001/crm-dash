import axiosInstance from "@/app/axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type OrderItem = {
  id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
  };
  price?: number;
  createdAt: string;
  updatedAt: string;
};

type OrderDetailType = {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerId?: string;
  userId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
  items: OrderItem[];
  customer?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

function formatAddress(address?: string): string {
  if (!address) return "-";
  return address;
}

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/orders/${id}`);
        const data = res.data;
        setOrder({
          id: data.id,
          orderNumber: data.orderNumber,
          status: data.status,
          subtotal: data.subtotal,
          tax: data.tax,
          shipping: data.shipping,
          total: data.total,
          customerId: data.customerId,
          userId: data.userId,
          notes: data.notes,
          shippingAddress: data.shippingAddress,
          billingAddress: data.billingAddress,
          trackingNumber: data.trackingNumber,
          estimatedDelivery: data.estimatedDelivery,
          shippedAt: data.shippedAt,
          deliveredAt: data.deliveredAt,
          items: (data.items || []).map((item: unknown) => {
            const typedItem = item as OrderItem & {
              product?: { name?: string };
              price?: number;
            };
            return {
              id: typedItem.id,
              quantity: typedItem.quantity,
              product: typedItem.product,
              price: typeof typedItem.price === "number" ? typedItem.price : 0,
              createdAt: typedItem.createdAt,
              updatedAt: typedItem.updatedAt,
            };
          }),
          customer: data.customer,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
        setError(null);
      } catch (err) {
        const errorObj = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        setError(
          errorObj.response?.data?.message ||
            errorObj.message ||
            "Error loading order"
        );
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
        <div>Order not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
      <div className="mb-4 flex items-center gap-2">
        <span className="font-semibold">Status:</span>
        <span>{order.status}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Customer:</span>{" "}
        <span>{order.customer?.name || "-"}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Total:</span>{" "}
        <span>${order.total.toFixed(2)}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Created At:</span>{" "}
        <span>{new Date(order.createdAt).toLocaleString()}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Notes:</span>{" "}
        <span>{order.notes || "-"}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Shipping Address:</span>{" "}
        <span>{formatAddress(order.shippingAddress)}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Billing Address:</span>{" "}
        <span>{formatAddress(order.billingAddress)}</span>
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
            {order.items.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center">
                  No items in this order.
                </td>
              </tr>
            ) : (
              order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border-b">
                    {item.product?.name || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">{item.quantity}</td>
                  <td className="px-4 py-2 border-b">
                    $
                    {typeof item.price === "number"
                      ? item.price.toFixed(2)
                      : "0.00"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
