import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  getProducts,
  deleteProduct,
  type Product,
  type ProductFilter,
} from "@/services/product/product.action";
import { useNavigate } from "react-router";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading, pagination, error } = useAppSelector(
    (state) => state.products
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [pageParams, setPageParams] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 10,
    }
  );
  useEffect(() => {
    const filter: ProductFilter = {
      q: search,
      categoryId: category || undefined,
    };
    dispatch(getProducts(filter));
  }, [dispatch, search, category]);

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handlePageChange = (newPage: number) => {
    setPageParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageParams({
      page: 1,
      limit: Number(e.target.value),
    });
  };
  return (
    <div className="bg-white m-8 rounded-lg shadow border border-gray-200">
      <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Product Stock</h2>
        <div className="flex items-center gap-4">
          <select
            className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            style={{ minWidth: 150 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => navigate("/add-product")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
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
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-red-500">
                  {typeof error === "string"
                    ? error
                    : "Failed to load products."}
                </td>
              </tr>
            ) : products && products.length > 0 ? (
              products.map((product: Product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="flex items-center gap-3  px-4 py-3">
                    <img src={product.image} className="size-24 rounded-xl" />
                    <span className="font-bold">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.categoryId || "-"}</td>
                  <td className="px-4 py-3">{product.vendor || "-"}</td>
                  <td className="px-4 py-3">{product.collection || "-"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/update-product/${product.id}`)}
                      className="text-blue-600 hover:underline mr-3 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline text-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination controls could go here if needed */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <div>
          <span className="text-sm text-gray-600">
            Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded border text-sm disabled:opacity-50"
            onClick={() => handlePageChange((pagination?.currentPage || 1) - 1)}
            disabled={!pagination || pagination.currentPage <= 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded border text-sm disabled:opacity-50"
            onClick={() => handlePageChange((pagination?.currentPage || 1) + 1)}
            disabled={
              !pagination || pagination.currentPage >= pagination.totalPages
            }
          >
            Next
          </button>
          <select
            className="ml-2 px-2 py-1 border rounded text-sm"
            value={pageParams.limit}
            onChange={handleLimitChange}
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
