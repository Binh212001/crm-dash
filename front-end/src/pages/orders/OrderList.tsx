import { useNavigate } from "react-router";
import OrderOverview from "./OrderOverview";
import { useEffect, useState } from "react";

// Mock data based on backend/src/api/order/dto/order-response.dto.ts
// Interfaces for Order, OrderItem, Product, and Customer

interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  categoryId: string;
  vendor: string;
  collection: string;
  stock: string;
  price: string;
  image: string;
  tags: string[];
}

interface OrderItem {
  id: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerId: string;
  userId: string;
  notes: string;
  shippingAddress: string;
  billingAddress: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  items: OrderItem[];
  customer: Customer;
  createdAt: string;
  updatedAt: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-1001",
    status: "pending",
    subtotal: 100,
    tax: 10,
    shipping: 5,
    total: 115,
    customerId: "c1",
    userId: "u1",
    notes: "Please deliver ASAP",
    shippingAddress: "123 Main St",
    billingAddress: "123 Main St",
    trackingNumber: "TRK123",
    estimatedDelivery: "2024-06-10T00:00:00Z",
    shippedAt: null,
    deliveredAt: null,
    items: [
      {
        id: "item1",
        quantity: 2,
        product: {
          id: "p1",
          name: "Product 1",
          sku: "SKU-001",
          description: "A nice product",
          categoryId: "cat1",
          vendor: "Vendor 1",
          collection: "Summer",
          stock: "10",
          price: "50",
          image: "",
          tags: [],
        },
        createdAt: "2024-06-01T10:00:00Z",
        updatedAt: "2024-06-01T10:00:00Z",
      },
    ],
    customer: {
      id: "c1",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
    },
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-1002",
    status: "completed",
    subtotal: 200,
    tax: 20,
    shipping: 10,
    total: 230,
    customerId: "c2",
    userId: "u2",
    notes: "",
    shippingAddress: "456 Elm St",
    billingAddress: "456 Elm St",
    trackingNumber: "TRK456",
    estimatedDelivery: "2024-06-12T00:00:00Z",
    shippedAt: "2024-06-05T12:00:00Z",
    deliveredAt: "2024-06-08T15:00:00Z",
    items: [
      {
        id: "item2",
        quantity: 1,
        product: {
          id: "p2",
          name: "Product 2",
          sku: "SKU-002",
          description: "Another product",
          categoryId: "cat2",
          vendor: "Vendor 2",
          collection: "Winter",
          stock: "5",
          price: "200",
          image: "",
          tags: [],
        },
        createdAt: "2024-06-02T11:00:00Z",
        updatedAt: "2024-06-02T11:00:00Z",
      },
    ],
    customer: {
      id: "c2",
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "0987654321",
      address: "456 Elm St",
    },
    createdAt: "2024-06-02T11:00:00Z",
    updatedAt: "2024-06-08T15:00:00Z",
  },
];

const OrderLists = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders(mockOrders);
  }, []);

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
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
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
                      onClick={() => navigate(`/orders/${order.id}`)}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderLists;
