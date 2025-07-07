import React, { useState } from "react";
import InputText from "../../components/InputText";
import { useGetProductsQuery } from "@/services/product.service";
import { useGetCustomersQuery } from "@/services/customer.service";
import Select from "@/components/Select";
import { useCreateOrderMutation } from "@/services/order.service";
import {  useGetUsersQuery } from "@/services/user.service";

// This interface mirrors the CreateOrderItemDto from backend
interface CreateOrderItemDto {
  productId?: string;
  quantity: number;
}

// This interface mirrors the CreateOrderDto from backend
interface CreateOrderDto {
  orderNumber?: string;
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
  const { data: products } = useGetProductsQuery({
    page: 1,
    limit: 100,
  });
  const { data: customers } = useGetCustomersQuery();
  const { data: users } = useGetUsersQuery({});

  const [productSelection, setProductSelection] = useState<string>("");
  const [createOrder] = useCreateOrderMutation();

  const [quantity, setQuantity] = useState<number>(1);
  const [order, setOrder] = useState<CreateOrderDto>({
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

  const handleOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numericValue =
      name === "subtotal" || name === "tax" || name === "shipping"
        ? Number(value)
        : value;

    setOrder((prev) => {
      const updated = {
        ...prev,
        [name]: numericValue,
      };

      // Tính toán lại total
      const subtotal = name === "subtotal" ? Number(value) : prev.subtotal;
      const tax = name === "tax" ? Number(value) : prev.tax ?? 0;
      const shipping = name === "shipping" ? Number(value) : prev.shipping ?? 0;

      updated.total = subtotal + tax + shipping;

      return updated;
    });
  };

  const addItem = () => {
    if (!productSelection || quantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }

    const product = products?.data.find((p) => p.id === productSelection);
    const newItem: CreateOrderItemDto = {
      productId: productSelection,
      quantity: quantity,
    };

    setOrder((prev) => ({
      ...prev,
      subtotal: prev.subtotal + (product?.price || 0) * quantity,
      items: [...prev.items, newItem],
    }));

    // Reset selection and quantity
    setProductSelection("");
    setQuantity(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("🚀 ~ handleSubmit ~ order:", order);
      await createOrder(order).unwrap();
      alert("Order created!");
      setOrder({
        orderNumber: "",
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
    } catch (error) {
      console.error("Error creating order:", error);
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
            <Select
              data={customers}
              select={order.customerId || ""}
              setSelect={(value) =>
                setOrder((prev) => ({ ...prev, customerId: value }))
              }
              label="Customer"
            />
            <Select
              data={users}
              select={order.userId || ""}
              setSelect={(value) =>
                setOrder((prev) => ({ ...prev, userId: value }))
              }
              label="User"
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
            <InputText
              label="Subtotal"
              name="subtotal"
              type="number"
              placeholder="Subtotal"
              value={order.subtotal}
              disabled
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
              disabled
              value={order.total}
            />
          </div>
          {/* Right column: Order Items */}
          <div className="flex-1 space-y-4 border-t pt-4 mt-4 md:mt-0 md:pt-0 md:border-t-0 md:border-l md:pl-6">
            <h3 className="font-semibold mb-2">Add Order Item</h3>
            <Select
              data={products}
              select={productSelection}
              setSelect={setProductSelection}
              label="Product"
            />
            <InputText
              label="Quantity"
              name="quantity"
              type="number"
              min={1}
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
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
                  <li key={idx}>Product: X Quantity: {it.quantity}</li>
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
