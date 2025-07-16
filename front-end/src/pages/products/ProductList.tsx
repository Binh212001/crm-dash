import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  getProducts,
  deleteProduct,
  type Product,
  type ProductFilter,
} from "@/services/product/product.action";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const filter: ProductFilter = {
      page,
      limit,
      q: search,
      categoryId: category || undefined,
    };
    dispatch(getProducts(filter));
  }, [dispatch, search, category, page, limit]);

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
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
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.categoryId || "-"}</td>
                  <td className="px-4 py-3">{product.vendor || "-"}</td>
                  <td className="px-4 py-3">{product.collection || "-"}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline mr-3 text-sm">
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
    </div>
  );
};

export default ProductList;
