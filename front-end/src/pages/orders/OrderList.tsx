import React, { useState } from "react";

interface Order {
  id: string;
  name: string;
  address: string;
  date: string;
  type: string;
  status: "Completed" | "Processing" | "Rejected";
}

const orderData: Order[] = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "098 Kutch Green Apt. 448",
    date: "14 Feb 2019",
    type: "Electric",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosia Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "14 Feb 2019",
    type: "Book",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Daniel Caldwell",
    address: "8587 Frida Ports",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Rejected",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 603",
    date: "14 Feb 2019",
    type: "Mobile",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Myles Throughway",
    date: "14 Feb 2019",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Wainanas Mountain",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Completed",
  },
];

const statusStyles: Record<Order["status"], string> = {
  Completed: "bg-label-completed  border-label-completed",
  Processing: "bg-label-processing  border-label-processing", 
  Rejected: "bg-label-rejected border-label-rejected",
};

const OrderList: React.FC = () => {
  const [orders] = useState(orderData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Lists</h2>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 text-sm hover:bg-gray-100">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
            </svg>
            Filter By
          </button>
          <select className="px-3 py-2 border border-gray-300 rounded text-sm bg-white">
            <option>14 Feb 2019</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded text-sm bg-white">
            <option>Order Type</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded text-sm bg-white">
            <option>Order Status</option>
          </select>
          <button className=" px-4 py-2 text-sm text-pink-600 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100">
              Reset Filter
          </button>
          </div>
          {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ minWidth: 250 }}
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
       
        </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm">
                <th className="px-4 py-3 text-left font-medium">Order ID</th>
                <th className="px-4 py-3 text-left font-medium">Customer Name</th>
                <th className="px-4 py-3 text-left font-medium">Address</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{order.id}</td>
                  <td className="px-4 py-3 text-gray-600">{order.name}</td>
                  <td className="px-4 py-3 text-gray-600">{order.address}</td>
                  <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  <td className="px-4 py-3 text-gray-600">{order.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs text-white font-medium rounded-full border ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
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
          <span>Showing 1-{orders.length} of {orders.length}</span>
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
    </div>
  );}

export default OrderList
