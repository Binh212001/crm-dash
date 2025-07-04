import React, { useState } from "react";
import InputText from "../../components/InputText";
import { useProductRelations } from "../../hooks/UseProductRelations";
import type { Category } from "../../services/category.service";
import {
  useCreateProductMutation,
  type CreateProductDto,
} from "../../services/product.service";

// The AddProduct form is rewritten to match the backend's CreateProductDto contract:
//   - name: string (Product Title)
//   - sku: string
//   - description?: string
//   - categoryId?: string
//   - vendor?: string
//   - collection?: string
//   - price?: number
//   - stock?: number
//   - tags?: string[] (IDs)

const AddProduct: React.FC = () => {
  const { categories, tags } = useProductRelations();
  const [createProduct, { isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();

  // Form state
  const [sku, setSku] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [vendor, setVendor] = useState("");
  const [collection, setCollection] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Remove unused handleTagChange

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers or empty string
    if (value === "") {
      setStock("");
    } else if (/^\d+$/.test(value)) {
      setStock(Number(value));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers or empty string
    if (value === "") {
      setPrice("");
    } else if (/^\d+(\.\d{0,2})?$/.test(value)) {
      setPrice(Number(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!sku || !title) {
      return;
    }

    const payload: CreateProductDto = {
      sku,
      name: title,
      description: description || undefined,
      categoryId: categoryId || undefined,
      vendor: vendor || undefined,
      collection: collection || undefined,
      price: price === "" ? undefined : price,
      stock: stock === "" ? undefined : stock,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    };

    try {
      await createProduct(payload).unwrap();
      setSku("");
      setTitle("");
      setDescription("");
      setCategoryId("");
      setVendor("");
      setCollection("");
      setPrice("");
      setStock("");
      setSelectedTags([]);
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
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
              {isSuccess && (
                <div className="text-green-600 text-sm mb-2">
                  Product created successfully!
                </div>
              )}
              {isError && (
                <div className="text-red-600 text-sm mb-2">
                  Failed to create product
                  {error && (typeof error === "string" ? `: ${error}` : "")}
                </div>
              )}
            </div>
            {/* Overview */}
            <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-6">
              <h3 className="font-semibold text-sm mb-4 w-full">Image</h3>
              <div className="w-full flex flex-col">
                <div className="w-32 h-32  border border-dashed border-gray-200 rounded flex items-center justify-center mb-4">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 16V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-4">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputText
                      label="Product SKU"
                      placeholder="SKU"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <InputText
                      label="Product Title"
                      placeholder="Product Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat: Category) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tags &&
                        tags.map((tag) => (
                          <label key={tag.id} className="flex items-center space-x-2 text-sm">
                            <input
                              type="checkbox"
                              value={tag.id}
                              checked={selectedTags.includes(tag.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTags([...selectedTags, tag.id]);
                                } else {
                                  setSelectedTags(selectedTags.filter((id) => id !== tag.id));
                                }
                              }}
                              className="form-checkbox"
                            />
                            <span>{tag.name}</span>
                          </label>
                        ))}
                    </div>
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
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                  />
                  <InputText
                    label="Collection"
                    placeholder="Collection"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                  />
                  <InputText
                    label="Stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={handleStockChange}
                    type="number"
                    min="0"
                  />
                    <InputText
                      label="Price"
                      placeholder="Price"
                      value={price}
                      onChange={handlePriceChange}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </div>
          {/* Sidebar */}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
