import React, { useState } from "react";
import InputText from "../../components/InputText";

// This interface mirrors the CreateOrderItemDto from backend
interface CreateOrderItemDto {
  productId?: string;
  quantity: number;
}

// This interface mirrors the CreateOrderDto from backend
interface CreateOrderDto {
  orderNumber?: string;
  status?: string;
  paymentStatus?: string;
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  customerId?: string;
  userId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: CreateOrderItemDto[];
}

const AddOrder: React.FC = () => {
  const [order, setOrder] = useState<CreateOrderDto>({
    orderNumber: "",
    status: "",
    paymentStatus: "",
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    customerId: "",
    userId: "",
    notes: "",
    shippingAddress: "",
    billingAddress: "",
    items: [],
  });

  const [item, setItem] = useState<CreateOrderItemDto>({
    productId: "",
    quantity: 1,
  });

  const handleOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: name === "subtotal" || name === "tax" || name === "shipping" || name === "total"
        ? Number(value)
        : value,
    }));
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const addItem = () => {
    setOrder((prev) => ({
      ...prev,
      items: [...prev.items, { ...item }],
    }));
    setItem({
      productId: "",
      quantity: 1,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      alert("Order created!");
      setOrder({
        orderNumber: "",
        status: "",
        paymentStatus: "",
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        customerId: "",
        userId: "",
        notes: "",
        shippingAddress: "",
        billingAddress: "",
        items: [],
      });
    } catch {
      alert("Error creating order");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-5 bg-white p-4 md:p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column: Order Info */}
          <div className="flex-1 space-y-4">
            <InputText
              label="Order Number"
              name="orderNumber"
              placeholder="Order Number"
              value={order.orderNumber}
              onChange={handleOrderChange}
            />
            <InputText
              label="Status"
              name="status"
              placeholder="Status"
              value={order.status}
              onChange={handleOrderChange}
            />
          
            <InputText
              label="Subtotal"
              name="subtotal"
              type="number"
              placeholder="Subtotal"
              value={order.subtotal}
              onChange={handleOrderChange}
            />
            <InputText
              label="Tax"
              name="tax"
              type="number"
              placeholder="Tax"
              value={order.tax}
              onChange={handleOrderChange}
            />
            <InputText
              label="Shipping"
              name="shipping"
              type="number"
              placeholder="Shipping"
              value={order.shipping}
              onChange={handleOrderChange}
            />
            <InputText
              label="Total"
              name="total"
              type="number"
              placeholder="Total"
              value={order.total}
              onChange={handleOrderChange}
            />
            <InputText
              label="Customer ID"
              name="customerId"
              placeholder="Customer ID"
              value={order.customerId}
              onChange={handleOrderChange}
            />
            <InputText
              label="User ID"
              name="userId"
              placeholder="User ID"
              value={order.userId}
              onChange={handleOrderChange}
            />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                name="notes"
                placeholder="Notes"
                value={order.notes}
                onChange={handleOrderChange}
              />
            </div>
            <InputText
              label="Shipping Address"
              name="shippingAddress"
              placeholder="Shipping Address"
              value={order.shippingAddress}
              onChange={handleOrderChange}
            />
            <InputText
              label="Billing Address"
              name="billingAddress"
              placeholder="Billing Address"
              value={order.billingAddress}
              onChange={handleOrderChange}
            />
          </div>
          {/* Right column: Order Items */}
          <div className="flex-1 space-y-4 border-t pt-4 mt-4 md:mt-0 md:pt-0 md:border-t-0 md:border-l md:pl-6">
            <h3 className="font-semibold mb-2">Add Order Item</h3>
            
            <InputText
              label="Product"
              name="productId"
              placeholder="Product ID"
              value={item.productId}
              onChange={handleItemChange}
              containerClassName="mb-2"
            />
           
            <InputText
              label="Quantity"
              name="quantity"
              type="number"
              min={1}
              placeholder="Quantity"
              value={item.quantity}
              onChange={handleItemChange}
              containerClassName="mb-2"
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addItem}
            >
              Add Item
            </button>
            <div className="mt-4">
              <h4 className="font-semibold">Order Items</h4>
              <ul className="list-disc pl-5">
                {order.items.map((it, idx) => (
                  <li key={idx}>
                    Product: X Quantity: {it.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded mt-6"
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
