import React, { useState } from "react";
import InputText from "../../components/InputText";
import { useAppDispatch } from "@/app/hook";
import {
  createCustomer,
  type Customer,
} from "@/services/customer/customer.action";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        avatar: files && files[0] ? files[0] : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const customerData: Customer = {
      name: form.name,
      email: form.email,
      ...(form.phone && { phone: form.phone }),
      ...(form.address && { address: form.address }),
      ...(form.country && { country: form.country }),
      ...(form.city && { city: form.city }),
      ...(form.postalCode && { postalCode: form.postalCode }),
    };

    try {
      await dispatch(createCustomer(customerData)).unwrap();
      navigate("/customers");
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/customers");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-9 bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <form className="flex-1" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Create Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="Name"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <InputText
              label="Email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <InputText
              label="Phone"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
            <InputText
              label="Address"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            <InputText
              label="Country"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
            />
            <InputText
              label="City"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />
            <InputText
              label="Postal Code"
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Customer"}
            </button>
            <button
              type="button"
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-xs"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
