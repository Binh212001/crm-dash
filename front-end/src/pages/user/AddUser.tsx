import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputText from "../../components/InputText";
import axiosInstance from "@/app/axiosInstance";

const AddUser = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    bio: "",
    avatar: null as File | null,
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        avatar: (e.target as HTMLInputElement).files?.[0] || null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Compose user data
      const userData = {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber || undefined,
        address: form.address || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        bio: form.bio || undefined,
        password: form.password || undefined,
      };

      // If avatar is present, use FormData for file upload
      if (form.avatar) {
        const fd = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            fd.append(key, value as string);
          }
        });
        fd.append("files", form.avatar as File);
        await axiosInstance.post("/user", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axiosInstance.post("/user", userData);
      }

      setLoading(false);
      navigate("/users");
    } catch (err: any) {
      setLoading(false);
      setError(
        err?.message ||
          (typeof err === "string" ? err : "Failed to create user")
      );
    }
  };

  // Cancel handler
  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-9 bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <form
          className="flex-1"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="text-lg font-semibold mb-4">Create User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="Name"
              name="name"
              required
              placeholder="Full Name"
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
              label="Password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <InputText
              label="Phone Number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            <InputText
              label="Address"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Date of Birth"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Bio"
                rows={2}
                value={form.bio}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Avatar
              </label>
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <div className="text-xs text-red-500 mt-2">{error}</div>}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create User"}
            </button>
            <button
              type="button"
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-xs"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
