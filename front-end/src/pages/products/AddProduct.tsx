import axiosInstance from "@/app/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputText from "../../components/InputText";
import { Input } from "@/components/ui/input";

const AddProduct: React.FC = () => {
  // Remove unused navigate
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    categoryId: "",
    vendor: "",
    collection: "",
    stock: "",
    price: "",
    image: null as File | null,
    imagePreview: "" as string, // For preview
    tags: [] as string[],
  });

  // For tags input (simple comma separated for now)
  const [tagsInput, setTagsInput] = useState("");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: file ? URL.createObjectURL(file) : "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    setForm((prev) => ({
      ...prev,
      tags: e.target.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Compose product data
      const productData = {
        sku: form.sku,
        name: form.name,
        description: form.description,
        vendor: form.vendor,
        collection: form.collection,
        stock: form.stock,
        price: form.price,
        tags: form.tags,
      };

      // Handle image upload for product
      if (form.image) {
        const fd = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            if (Array.isArray(value)) {
              value.forEach((v) => fd.append(key, v));
            } else {
              fd.append(key, value as string);
            }
          }
        });
        fd.append("files", form.image as File);
        await axiosInstance.post("/products", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axiosInstance.post("/products", productData);
      }

      setLoading(false);
      // Optionally reset form or navigate
    } catch (err) {
      setLoading(false);
      if (err && typeof err === "object" && "message" in (err as any)) {
        setError(
          (err as { message?: string }).message || "Failed to create product"
        );
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Failed to create product");
      }
    }
  };

  return (
    <div className="min-h-screen p-6">
      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Main Form */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Header */}
            <div>
              <h2 className="text-base font-semibold mb-2">Create product</h2>
            </div>
            {/* Overview */}
            <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-4">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputText
                      label="Product SKU"
                      placeholder="SKU"
                      required
                      name="sku"
                      value={form.sku}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <InputText
                      label="Product Title"
                      placeholder="Product Title"
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none"
                    rows={3}
                    placeholder="Product description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none"
                      name="categoryId"
                      value={form.categoryId}
                      onChange={handleChange}
                    >
                      <option value="">Select category</option>
                      <option value="digital">Digital Product</option>
                      <option value="physical">Physical Product</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none"
                      placeholder="Comma separated tags"
                      value={tagsInput}
                      onChange={handleTagsChange}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <Input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {form.imagePreview && (
                      <div className="mt-2">
                        <img
                          src={form.imagePreview}
                          alt="Preview"
                          className="h-24 w-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Information */}
            <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-6">
              <h3 className="font-semibold text-sm mb-4">
                Additional Information
              </h3>
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputText
                    label="Vendor"
                    placeholder="Vendor"
                    name="vendor"
                    value={form.vendor}
                    onChange={handleChange}
                  />
                  <InputText
                    label="Collection"
                    placeholder="Collection"
                    name="collection"
                    value={form.collection}
                    onChange={handleChange}
                  />
                  <InputText
                    label="Stock"
                    placeholder="Stock"
                    type="number"
                    min="0"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                  />
                  <InputText
                    label="Price"
                    placeholder="Price"
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {typeof error === "string"
                    ? error
                    : "Failed to create product."}
                </div>
              )}
            </div>
          </div>
          {/* Sidebar */}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
