import React, { useEffect, useState } from "react";

import clsx from "clsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import Button from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownCustom } from "@/components/DropdownCustom";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getCustomers } from "@/services/customer/customer.action";
import { getProducts, type Product } from "@/services/product/product.action"; // You need to have this action

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderFormValues {
  orderNumber?: string;
  status?: string;
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  customerId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: OrderItem[];
}

const initialItem: OrderItem = {
  productId: "",
  quantity: 1,
  price: 0,
};

const initialForm: CreateOrderFormValues = {
  orderNumber: "",
  status: "PENDING",
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  customerId: "",
  notes: "",
  shippingAddress: "",
  billingAddress: "",
  items: [initialItem],
};

const orderStatusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const AddOrder: React.FC = () => {
  const [form, setForm] = useState<CreateOrderFormValues>(initialForm);

  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchProducts, setSearchProducts] = useState<string[]>([""]);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { customers } = useAppSelector((state) => state.customers);
  const customerSelectData = customers.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  // Product select data
  const { products } = useAppSelector((state) => state.products);
  const productSelectData = products
    .filter((p: Product) => p.id) // Filter out products without id
    .map((p: Product) => ({
      id: p.id!,
      name: p.name,
      price:
        typeof p.price === "string"
          ? parseFloat(p.price) || 0
          : (p.price as number) || 0,
    }));

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const handleItemChange = (
    idx: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[idx] = { ...items[idx], [field]: value };
      // If productId changed, auto set price if found
      if (field === "productId") {
        const found = productSelectData.find((p) => p.id === value);
        if (found) {
          items[idx].price = found.price || 0;
        }
      }
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { ...initialItem }],
    }));
    setSearchProducts((prev) => [...prev, ""]);
  };

  const removeItem = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
    setSearchProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  // Fetch customers
  useEffect(() => {
    dispatch(
      getCustomers({
        q: searchCustomer,
      })
    );
  }, [searchCustomer, dispatch]);

  // Fetch products for each item
  useEffect(() => {
    searchProducts.forEach((search) => {
      dispatch(
        getProducts({
          q: search,
        })
      );
    });
  }, [searchProducts, dispatch]);

  // Calculate subtotal and total automatically
  React.useEffect(() => {
    const subtotal = form.items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    setForm((prev) => ({
      ...prev,
      subtotal,
      total: subtotal + (Number(prev.tax) || 0) + (Number(prev.shipping) || 0),
    }));
    // eslint-disable-next-line
  }, [form.items, form.tax, form.shipping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Order created!\n" + JSON.stringify(form, null, 2));
  };

  // Handle product search for each item
  const handleProductSearch = (idx: number, value: string) => {
    setSearchProducts((prev) => {
      const arr = [...prev];
      arr[idx] = value;
      return arr;
    });
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Thêm Đơn Hàng Mới</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="orderNumber">Mã đơn hàng</label>
              <Input
                id="orderNumber"
                name="orderNumber"
                value={form.orderNumber}
                onChange={handleChange}
                placeholder="Nhập mã đơn hàng"
              />
            </div>
            <div></div>
            <div>
              <label htmlFor="customerId">Khách hàng</label>
              <DropdownCustom
                data={customerSelectData}
                placeholder="Chọn khách hàng"
                name="customerId"
                label="Chọn khách hàng"
                search={setSearchCustomer}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, customerId: value }))
                }
                value={form.customerId}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="notes">Ghi chú</label>
              <Textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Ghi chú đơn hàng"
                rows={2}
              />
            </div>
            <div>
              <label htmlFor="shippingAddress">Địa chỉ giao hàng</label>
              <Input
                id="shippingAddress"
                name="shippingAddress"
                value={form.shippingAddress}
                onChange={handleChange}
                placeholder="Địa chỉ giao hàng"
              />
            </div>
            <div>
              <label htmlFor="billingAddress">Địa chỉ thanh toán</label>
              <Input
                id="billingAddress"
                name="billingAddress"
                value={form.billingAddress}
                onChange={handleChange}
                placeholder="Địa chỉ thanh toán"
              />
            </div>
          </div>
          <div>
            <div className="font-semibold mt-2 mb-2">Sản phẩm</div>
            <div className="space-y-2">
              {form.items.map((item, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "flex flex-col md:flex-row gap-2 items-center",
                    "bg-gray-50 rounded-md p-2"
                  )}
                >
                  <div className="flex-1">
                    <label>Sản phẩm</label>
                    <DropdownCustom
                      data={productSelectData}
                      placeholder="Chọn sản phẩm"
                      name={`productId-${idx}`}
                      label="Chọn sản phẩm"
                      search={(value) => handleProductSearch(idx, value)}
                      onChange={(value) =>
                        handleItemChange(idx, "productId", value)
                      }
                      value={item.productId}
                    />
                  </div>
                  <div className="flex-1">
                    <label>Số lượng</label>
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          idx,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      placeholder="Số lượng"
                    />
                  </div>
                  <div className="flex-1">
                    <label>Đơn giá</label>
                    <Input
                      type="number"
                      min={0}
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(idx, "price", Number(e.target.value))
                      }
                      placeholder="Đơn giá"
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={() => removeItem(idx)}
                      disabled={form.items.length === 1}
                      className="mt-5 md:mt-0"
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addItem}
              className="mt-2"
            >
              Thêm sản phẩm
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="tax">Thuế</label>
              <Input
                id="tax"
                name="tax"
                type="number"
                min={0}
                value={form.tax}
                onChange={handleNumberChange}
                placeholder="Thuế"
              />
            </div>
            <div>
              <label htmlFor="shipping">Phí vận chuyển</label>
              <Input
                id="shipping"
                name="shipping"
                type="number"
                min={0}
                value={form.shipping}
                onChange={handleNumberChange}
                placeholder="Phí vận chuyển"
              />
            </div>
            <div>
              <label htmlFor="subtotal">Tạm tính</label>
              <Input
                id="subtotal"
                name="subtotal"
                type="number"
                value={form.subtotal}
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="total">Tổng cộng</label>
              <Input
                id="total"
                name="total"
                type="number"
                value={form.total}
                readOnly
                className="bg-gray-100"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Tạo đơn hàng</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddOrder;
