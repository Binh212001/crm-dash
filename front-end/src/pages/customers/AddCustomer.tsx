import React, { useState } from "react";
import { useCreateCustomerMutation } from "../../services/customer.service";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/InputText";

const AddCustomer = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    avatar: "",
    tags: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createCustomer({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone || undefined,
        country: form.country || undefined,
        address: form.address || undefined,
        city: form.city || undefined,
        postalCode: form.postalCode || undefined,
        avatar: form.avatar || undefined,
        // tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      }).unwrap();
      navigate("/customers");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any)?.data?.message || "Failed to add customer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-9 bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          {error && (
            <div className="mb-2 text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 text-xs">
              {error}
            </div>
          )}
          {/* Overview */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputText
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
              />
              <InputText
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
              />
              <div className="md:col-span-2">
                <InputText
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
              </div>
              <div className="md:col-span-2">
                <InputText
                  label="Phone number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>
          {/* Address Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              <div className="md:col-span-2">
                <InputText
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </div>
              <InputText
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
              />
              <InputText
                label="Postal Code"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
              />
            </div>
          </div>
          {/* Customer Tags */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Customer Tags</h3>
            <InputText
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Add tags (comma separated)..."
            />
          </div>
          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Add Customer"}
            </button>
            <button
              type="button"
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-xs"
              onClick={() => navigate("/customers")}
            >
              Cancel
            </button>
          </div>
        </form>
        {/* Sidebar: Image Upload & Tags */}
        <div className="w-full md:w-72 flex flex-col gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
            <div className="w-28 h-28 rounded-lg bg-white border border-dashed border-gray-300 flex items-center justify-center mb-3">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    strokeWidth="2"
                    stroke="currentColor"
                  />
                  <path
                    d="M8 15l2.5-3 2.5 3 3.5-4.5 4 6.5H4l4-6.5z"
                    strokeWidth="2"
                    stroke="currentColor"
                  />
                </svg>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setForm((prev) => ({
                      ...prev,
                      avatar: reader.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <button
              type="button"
              className="w-full px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-medium"
              onClick={() => {
                document.getElementById("avatar-upload")?.click();
              }}
            >
              Upload Image
            </button>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-xs font-semibold mb-2">Customer Tags</h4>
            <InputText
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Add tags (comma separated)..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
