import React, { useState, useEffect } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  city?: string;
  lastSeen?: Date;
  lastOrder?: Date;
  avatar?: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        orders: 5,
        totalSpent: 1250.00,
        city: 'New York',
        lastSeen: new Date('2024-01-15'),
        lastOrder: new Date('2024-01-10'),
        avatar: 'https://i.imgur.com/avatar1.jpg'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        orders: 3,
        totalSpent: 890.50,
        city: 'Los Angeles',
        lastSeen: new Date('2024-01-14'),
        lastOrder: new Date('2024-01-08')
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        orders: 8,
        totalSpent: 2100.75,
        city: 'Chicago',
        lastSeen: new Date('2024-01-16'),
        lastOrder: new Date('2024-01-12'),
        avatar: 'https://i.imgur.com/avatar3.jpg'
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        orders: 2,
        totalSpent: 450.25,
        lastSeen: new Date('2024-01-13'),
        lastOrder: new Date('2024-01-05')
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setCustomers(mockCustomers);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white m-8 rounded-lg shadow border border-gray-200">
        <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Customer List</h2>
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              style={{ minWidth: 150 }}
            >
              <option value="">All Cities</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
            </select>
            <input
              type="text"
              placeholder="Search customer name"
              className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              style={{ minWidth: 220 }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm">
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Orders</th>
                <th className="px-4 py-3 text-left font-medium">Total Spent</th>
                <th className="px-4 py-3 text-left font-medium">City</th>
                <th className="px-4 py-3 text-left font-medium">Last Seen</th>
                <th className="px-4 py-3 text-left font-medium">Last Order</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {customer.avatar ? (
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 text-sm font-medium">
                            {customer.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                  <td className="px-4 py-3 text-gray-700">{customer.orders}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.city || '-'}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.lastSeen.toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.lastOrder.toLocaleDateString()}</td>
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
          <span>Showing 1-{customers.length} of {customers.length}</span>
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
  );
};

export default CustomerList;