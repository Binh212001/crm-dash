import React, { useState, useEffect } from "react";
import { useUpdateCustomerMutation, useGetCustomerQuery, useGetCustomersQuery } from "../../services/customer.service";
import { useNavigate, useParams } from "react-router-dom";
import InputText from "../../components/InputText";

const UpdateCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch the customer data for the given id
  const { data: customer, isLoading: isCustomerLoading } = useGetCustomerQuery(id || "");
  const { refetch } = useGetCustomersQuery();

  const [form, setForm] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    avatar: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

  // Populate form with customer data when loaded
  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        country: customer.country || "",
        city: customer.city || "",
        postalCode: customer.postalCode || "",
        avatar: customer.avatar || "",
      });
    }
  }, [customer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!id) {
      setError("Customer ID is missing.");
      return;
    }
    try {
      await updateCustomer({
        id,
        data: {
          name: form.name,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          address: form.address || undefined,
          country: form.country || undefined,
          city: form.city || undefined,
          postalCode: form.postalCode || undefined,
          avatar: form.avatar || undefined,
        },
      }).unwrap();
      refetch();
      navigate("/customers");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any)?.data?.message || "Failed to update customer");
    }
  };

  if (isCustomerLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading customer...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-9 bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Update Customer</h2>
          {error && (
            <div className="mb-2 text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 text-xs">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
            />
            <InputText
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <InputText
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <InputText
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <InputText
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <InputText
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <InputText
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
            />
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
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Customer"}
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
        {/* Sidebar: Avatar Upload */}
        <div className="w-full md:w-72 flex flex-col gap-4 mt-6 md:mt-0">
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
              onChange={handleAvatarUpload}
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
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer; 