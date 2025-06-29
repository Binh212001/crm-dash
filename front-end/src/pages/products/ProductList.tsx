import React from "react";

const productData = [
  {
    key: "1",
    sku:"TTY",
    image: "https://i.imgur.com/1.png",
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: "$690.00",
    pieces: 63,
    colors: ["#000000", "#ffffff", "#f5222d"],
  },
  {
    key: "2",
    sku:"TSY",

    image: "https://i.imgur.com/2.png",
    name: "Microsoft Headquare",
    category: "Digital Product",
    price: "$190.00",
    pieces: 13,
    colors: ["#000000", "#ffffff", "#faad14", "#1890ff"],
  },
];

const ProductList: React.FC = () => {
  return (
    <div className="bg-white m-8 rounded-lg shadow border border-gray-200">
      <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Product Stock</h2>
        <div className="flex items-center gap-4">
          <select
            className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            style={{ minWidth: 150 }}
          >
            <option value="">All Categories</option>
            <option value="digital">Digital Product</option>
            <option value="physical">Physical Product</option>
            <option value="service">Service</option>
          </select>
          <input
            type="text"
            placeholder="Search product name"
            className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            style={{ minWidth: 220 }}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="px-4 py-3 text-left font-medium">SKU</th>
              <th className="px-4 py-3 text-left font-medium">Image</th>
              <th className="px-4 py-3 text-left font-medium">Product Name</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-left font-medium">Piece</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {productData.map((product) => (
              <tr
                key={product.key}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium text-gray-800">{product.sku}</td>

                <td className="px-4 py-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                <td className="px-4 py-3 text-gray-600">{product.category}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{product.price}</td>
                <td className="px-4 py-3 text-gray-700">{product.pieces}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-blue-50 transition"
                      title="Edit"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
        <span>Showing 1-2 of 78</span>
        <div className="flex space-x-1">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100 transition" disabled>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100 transition">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
