import axiosInstance from "@/app/axiosInstance";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Category {
  id: string;
  name: string;
}

const CategorySetting = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all categories from backend
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<Category[]>("/category");
      setCategories(res.data.data);
    } catch {
      toast.error("Không thể tải danh mục. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category via backend
  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        setLoading(true);
        const res = await axiosInstance.post<Category>("/category", {
          name: newCategory.trim(),
        });
        setCategories((prev) => [...prev, res.data]);
        setNewCategory("");
        toast.success("Thêm danh mục thành công!");
      } catch {
        toast.error("Không thể thêm danh mục. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Remove category via backend
  const handleRemoveCategory = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/category/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Xóa danh mục thành công!");
    } catch {
      toast.error("Không thể xóa danh mục. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Quản lý danh mục
      </h3>
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Thêm danh mục mới"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            disabled={loading}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleAddCategory}
            disabled={loading}
          >
            Thêm
          </button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between py-2">
            <span>{cat.name}</span>
            <button
              className="text-red-500 hover:underline text-sm"
              onClick={() => handleRemoveCategory(cat.id)}
              disabled={loading}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySetting;
