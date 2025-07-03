import React from "react";
import { useGetProductsQuery } from "../../services/product.service";
import { useNavigate } from "react-router";

const ProductList: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

   const navigate  = useNavigate()
  // For now, just show a loading or error state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Loading products...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-500">Failed to load products.</span>
      </div>
    );
  }

  // Fallback if no data
  const products = data?.data || [];

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
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
            onClick={()=> navigate('/add-product')} // Add handler for opening new customer modal/form
          >
            New Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Product Name</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Vendor</th>
              <th className="px-4 py-3 text-left font-medium">Collection</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {product.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.categoryId || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.vendor || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.collection || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
