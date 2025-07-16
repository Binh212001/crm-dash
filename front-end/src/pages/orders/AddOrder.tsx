import React from "react";
import InputText from "../../components/InputText";
import Select from "@/components/Select";

const AddOrder: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto my-5 bg-white p-4 md:p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Order</h2>
      <form>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column: Order Info */}
          <div className="flex-1 space-y-4">
            <Select select={""} setSelect={() => {}} label="Customer" />
            <Select select={""} setSelect={() => {}} label="User" />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                name="notes"
                placeholder="Notes"
                value={""}
                onChange={() => {}}
              />
            </div>
            <InputText
              label="Shipping Address"
              name="shippingAddress"
              placeholder="Shipping Address"
              value={""}
              onChange={() => {}}
            />
            <InputText
              label="Billing Address"
              name="billingAddress"
              placeholder="Billing Address"
              value={""}
              onChange={() => {}}
            />
            <InputText
              label="Subtotal"
              name="subtotal"
              type="number"
              placeholder="Subtotal"
              value={0}
              disabled
            />
            <InputText
              label="Tax"
              name="tax"
              type="number"
              placeholder="Tax"
              value={0}
              onChange={() => {}}
            />
            <InputText
              label="Shipping"
              name="shipping"
              type="number"
              placeholder="Shipping"
              value={0}
              onChange={() => {}}
            />
            <InputText
              label="Total"
              name="total"
              type="number"
              placeholder="Total"
              disabled
              value={0}
            />
          </div>
          {/* Right column: Order Items */}
          <div className="flex-1 space-y-4 border-t pt-4 mt-4 md:mt-0 md:pt-0 md:border-t-0 md:border-l md:pl-6">
            <h3 className="font-semibold mb-2">Add Order Item</h3>
            <Select select={""} setSelect={() => {}} label="Product" />
            <InputText
              label="Quantity"
              name="quantity"
              type="number"
              min={1}
              placeholder="Quantity"
              value={1}
              onChange={() => {}}
              containerClassName="mb-2"
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {}}
            >
              Add Item
            </button>
            <div className="mt-4">
              <h4 className="font-semibold">Order Items</h4>
              <ul className="list-disc pl-5">{/* No items */}</ul>
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
