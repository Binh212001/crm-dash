import React, { useState } from "react";
import { useCreateUserMutation } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/InputText";

const AddUser = () => {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    bio: "",
    image: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      await createUser({
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber || undefined,
        address: form.address || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        bio: form.bio || undefined,
        image: form.image || undefined,
      }).unwrap();
      navigate("/communication/users");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any)?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full  mx-9 bg-white border border-gray-300 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Create User</h2>
          {error && (
            <div className="mb-2 text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 text-xs">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Username"
            />
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
              label="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
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
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Date of Birth"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Bio"
                rows={2}
              />
            </div>
            <InputText
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
