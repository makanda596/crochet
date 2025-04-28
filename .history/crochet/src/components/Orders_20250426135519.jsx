import React, { useEffect, useState } from 'react';
import { FiSearch, FiShoppingCart, FiChevronRight, FiAlertCircle } from 'react-icons/fi';
import AddOrder from './AddOrder';
import { useAuthStore } from '../utilis/auth';
import LoadSpinner from './LoadSpinner'
const Orders = () => {
  const { orders, getOrders, loading, error, pagination } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (
      order.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


  const handlePageChange = (direction) => {
    if (direction === 'next' && pagination.currentPage < pagination.totalPages) {
      getOrders(pagination.currentPage + 1);
    } else if (direction === 'previous' && pagination.currentPage > 1) {
      getOrders(pagination.currentPage - 1);
    }
  };

  if (loading) return <LoadSpinner />;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <FiShoppingCart className="text-purple-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <AddOrder />

          <div className="relative flex-1 min-w-[200px]">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <span className="text-red-600">{error}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-6 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500 border-b border-gray-100">
          <div>Name</div>
          <div>Description</div>
          <div>Phone</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Date</div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredOrders.map((order) => (
            <div key={order.id} className="group hover:bg-gray-50 transition-colors">
              {/* Desktop Row */}
              <div className="hidden md:grid grid-cols-6 px-6 py-4 items-center text-sm">
                <div className="font-medium text-gray-900">{order.orderName}</div>
                <div className="text-gray-600 truncate max-w-[200px]">{order.description}</div>
                <div className="text-purple-600 font-medium">{order.phoneNumber}</div>
                <div className="font-semibold">₦{order.amount?.toLocaleString()}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${{
                    completed: 'bg-green-100 text-green-800',
                    pending: 'bg-yellow-100 text-yellow-800',
                    cancelled: 'bg-red-100 text-red-800'
                  }[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <a href={`/order/${order._id}`}>view details</a>
              </div>

              {/* Mobile View */}
              <div className="md:hidden p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900">{order.orderName}</h3>
                    <p className="text-sm text-gray-600 truncate">{order.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${{
                    completed: 'bg-green-100 text-green-800',
                    pending: 'bg-yellow-100 text-yellow-800',
                    cancelled: 'bg-red-100 text-red-800'
                  }[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <div className="text-gray-500">Phone</div>
                    <div className="text-purple-600 font-medium">{order.phoneNumber}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-500">Amount</div>
                    <div className="font-semibold">₦{order.amount?.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-500">Date</div>
                    <div className="text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && !loading && (
          <div className="p-8 text-center text-gray-400">
            <div className="inline-block p-4 mb-2 rounded-full bg-gray-50">
              <FiShoppingCart className="w-8 h-8" />
            </div>
            <p className="font-medium">No orders found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {/* {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange('previous')}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-all"
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Orders;