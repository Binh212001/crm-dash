import React from 'react';

const AddProduct: React.FC = () => {
  return (
    <div className="bg-[#f7f7f9] min-h-screen p-6">
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
                  <label className="block text-xs font-medium mb-1">Product SKU</label>
                  <input
                    type="text"
                    placeholder="SKU"
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Product Title</label>
                  <input
                    type="text"
                    placeholder="Product Title"
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium mb-1">Product Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none"
                />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Category</label>
                  <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none">
                    <option value="">Select category</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Vendor</label>
                  <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none">
                    <option value="">Select vendor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Address Information (for product, let's use Collection and Tags) */}
          <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-4">Additional Information</h3>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Collection</label>
                <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none">
                  <option value="">Select collection</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Variants</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Variant Attribute</label>
                    <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none">
                      <option value="">Select attribute</option>
                      <option value="size">Size</option>
                      <option value="color">Color</option>
                      {/* Add more attributes as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Variant Value</label>
                    <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none">
                      <option value="">Select value</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      {/* Add more values as needed */}
                    </select>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Select a variant attribute and its value (e.g. Size: Medium, Color: Red)
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6">
          {/* Image Upload */}
          <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
            <h3 className="font-semibold text-sm mb-4 w-full">Image</h3>
            <div className="w-full flex flex-col items-center">
              <div className="w-32 h-32 bg-[#f7f7f9] border border-dashed border-gray-200 rounded flex items-center justify-center mb-4">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l2 2 4-4" />
                </svg>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Upload Image</button>
            </div>
          </div>
          {/* Customer Tags (Product Tags) */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-sm mb-4">Product Tags</h3>
            <input
              type="text"
              placeholder="Add tags for product..."
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-[#f7f7f9] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;