import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiChevronRight } from 'react-icons/fi';
import LoadSpinner from './LoadSpinner';
import { useAuthStore } from '../utilis/auth';

const Orders = () => {
  const { orders, loading, error } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with real data from your API
  const mockOrders = [
    {
      id: '#CR23456',
      customer: 'Sarah Johnson',
      date: '2024-03-15',
      status: 'Completed',
      total: 149.99,
      items: 3
    },
    {
      id: '#CR23457',
      customer: 'Mike Peterson',
      date: '2024-03-14',
      status: 'Pending',
      total: 89.99,
      items: 2
    },
    // Add more mock orders as needed
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <LoadSpinner />;

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <FiShoppingCart className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold">Order Management</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="hidden md:grid grid-cols-5 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Date</div>
          <div>Status</div>
          <div>Total</div>
        </div>

        <div className="divide-y">
          {filteredOrders.map((order) => (
            <div key={order.id} className="group hover:bg-gray-50 transition-colors">
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-5 px-6 py-4 items-center">
                <div className="font-medium">{order.id}</div>
                <div>{order.customer}</div>
                <div>{new Date(order.date).toLocaleDateString()}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="font-semibold">${order.total.toFixed(2)}</div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.customer}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <div className="text-sm">{new Date(order.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{order.items} items</div>
                  </div>
                  <div className="font-semibold">${order.total.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No orders found matching your criteria
          </div>
        )}
      </div>

      {/* Pagination (Add logic as needed) */}
      <div className="flex justify-center items-center space-x-4">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Previous
        </button>
        <span>Page 1 of 1</span>
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;