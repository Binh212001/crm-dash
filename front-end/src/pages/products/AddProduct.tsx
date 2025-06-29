import React from 'react';

const AddProduct: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Add a product</h1>
        <p className="text-gray-500 mb-8">Orders placed across your store</p>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main form */}
          <div className="flex-1">
            {/* Product Title */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Product SKU</label>
              <input type="text" placeholder="Enter product SKU..." className="w-full border rounded px-4 py-2 focus:outline-none" />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2">Product Title</label>
              <input type="text" placeholder="Write title here..." className="w-full border rounded px-4 py-2 focus:outline-none" />
            </div>
            {/* Product Description */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Product Description</label>
              <div className="bg-gray-100 rounded-t px-2 py-2 flex items-center gap-2 text-gray-600 text-lg">
                <button type="button" title="Undo">↶</button>
                <button type="button" title="Redo">↷</button>
                <button type="button" className="font-bold">B</button>
                <button type="button" className="italic">I</button>
                <button type="button" className="underline">U</button>
                <button type="button" className="line-through">S</button>
                <button type="button">•</button>
                <button type="button">1.</button>
                <button type="button">≡</button>
                <button type="button">⎘</button>
                <button type="button">🔗</button>
              </div>
              <textarea placeholder="Write a description here..." className="w-full border-t-0 border rounded-b px-4 py-2 min-h-[120px] focus:outline-none" />
            </div>
            {/* Display images */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Display images</label>
              <div className="border-2 border-dashed rounded flex flex-col items-center justify-center py-10 text-gray-500">
                <p>Drag your photo here or <span className="text-blue-600 cursor-pointer">Browse from device</span></p>
                <div className="text-5xl mt-4">🖼️</div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-[350px] flex flex-col gap-6">
            <div className="bg-white rounded shadow p-6">
              <h2 className="font-semibold text-lg mb-4">Organize</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium">Category <span className="text-blue-600 text-xs cursor-pointer ml-1">Add new category</span></label>
                <select className="w-full border rounded px-3 py-2 mt-1">
                  <option>Men's Clothing</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Vendor <span className="text-blue-600 text-xs cursor-pointer ml-1">Add new vendor</span></label>
                <select className="w-full border rounded px-3 py-2 mt-1">
                  <option>Men's Clothing</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Collection</label>
                <input className="w-full border rounded px-3 py-2 mt-1" placeholder="Collection" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Tags <span className="text-blue-600 text-xs cursor-pointer ml-1">View all tags</span></label>
                <select className="w-full border rounded px-3 py-2 mt-1">
                  <option>Men's Clothing</option>
                </select>
              </div>
            </div>
            {/* Variants */}
            <div className="bg-white rounded shadow p-6">
              <h2 className="font-semibold text-lg mb-4">Variants</h2>
              <div className="flex items-center gap-2 mb-2">
                <span>Option 1</span>
                <button className="text-blue-600 text-xs">Remove</button>
              </div>
              <select className="w-full border rounded px-3 py-2 mb-2">
                <option>Size</option>
              </select>
              <div className="border rounded px-3 py-2 text-gray-400">Value</div>
            </div>
            {/* Action buttons */}
            <div className="flex gap-2 justify-end mt-4">
              <button className="px-4 py-2 rounded border">Discard</button>
              <button className="px-4 py-2 rounded border bg-blue-50 text-blue-700">Save draft</button>
              <button className="px-4 py-2 rounded bg-blue-600 text-white">Publish product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct; 