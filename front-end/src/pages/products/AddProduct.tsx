import React from "react";
import InputText from "../../components/InputText";

const AddProduct: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      <form>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Main Form */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Header */}
            <div>
              <h2 className="text-base font-semibold mb-2">Create product</h2>
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
                    <InputText label="Product SKU" placeholder="SKU" required />
                  </div>
                  <div>
                    <InputText
                      label="Product Title"
                      placeholder="Product Title"
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
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Category
                    </label>
                    <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm  focus:outline-none">
                      <option value="">Select category</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2"></div>
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
                  <InputText label="Vendor" placeholder="Vendor" />
                  <InputText label="Collection" placeholder="Collection" />
                  <InputText
                    label="Stock"
                    placeholder="Stock"
                    type="number"
                    min="0"
                  />
                  <InputText
                    label="Price"
                    placeholder="Price"
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
              >
                Create Product
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
