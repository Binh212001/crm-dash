import axiosInstance from "@/app/axiosInstance";
import { useEffect, useState } from "react";

// Dummy data for illustration
const salesData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 14000 },
  { month: "May", revenue: 20000 },
  { month: "Jun", revenue: 17000 },
];

type TopProduct = {
  id: string;
  name: string;
  sold: number;
  // Add other fields if needed
};
type TopCustomers = {
  customer: string; // Khách hàng
  orderCount: number; // Số đơn
  revenue: number; // Doanh thu
  // Add other fields if needed
};

// Simple chart using SVG (for demo, not interactive)
const RevenueChart = ({ data }: { data: typeof salesData }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  return (
    <svg width="100%" height="120" viewBox="0 0 320 120">
      {/* Bars */}
      {data.map((d, i) => (
        <rect
          key={d.month}
          x={i * 50 + 20}
          y={120 - (d.revenue / maxRevenue) * 100}
          width={30}
          height={(d.revenue / maxRevenue) * 100}
          fill="#3b82f6"
          rx={4}
        />
      ))}
      {/* Labels */}
      {data.map((d, i) => (
        <text
          key={d.month + "-label"}
          x={i * 50 + 35}
          y={115}
          textAnchor="middle"
          fontSize="12"
          fill="#374151"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
};

const Dashboard = () => {
  // Call API to get top products and store in state

  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomers[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await axiosInstance.get("/products/top");
        setTopProducts(res.data);
      } catch (error) {
        // Optionally log or handle the error
        console.error("Failed to fetch top products:", error);
      }
    };
    fetchTopProducts();
  }, []);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const res = await axiosInstance.get("/customer/top");
        setTopCustomers(res.data);
      } catch (error) {
        // Optionally log or handle the error
        console.error("Failed to fetch top customers:", error);
      }
    };
    fetchTopCustomers();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Tổng khách hàng</div>
                <div className="text-2xl font-semibold text-gray-900">0</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Tổng đơn hàng</div>
                <div className="text-2xl font-semibold text-gray-900">0</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Tổng sản phẩm</div>
                <div className="text-2xl font-semibold text-gray-900">0</div>
              </div>
            </div>
          </div>
          {/* Chart doanh số doanh thu */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Doanh thu theo tháng
            </h2>
            <RevenueChart data={salesData} />
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              {salesData.map((d) => (
                <div key={d.month} className="w-1/6 text-center">
                  {d.revenue.toLocaleString()} đ
                </div>
              ))}
            </div>
          </div>
          {/* Top sản phẩm & Top khách hàng */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top sản phẩm */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Top sản phẩm bán chạy
              </h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Sản phẩm</th>
                    <th className="py-2">Số lượng bán</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2">{product.name}</td>
                      <td className="py-2">{product.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Top khách hàng */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Top khách hàng
              </h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Khách hàng</th>
                    <th className="py-2">Số đơn</th>
                    <th className="py-2">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((customer) => (
                    <tr key={customer.customer} className="border-t">
                      <td className="py-2">{customer.customer}</td>
                      <td className="py-2">{customer.orderCount}</td>
                      <td className="py-2">
                        {customer.revenue.toLocaleString()} đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
