import React, { useEffect, useState } from 'react';
import { FiSearch, FiShoppingCart, FiChevronRight, FiAlertCircle } from 'react-icons/fi';
import AddOrder from './AddOrder';
import { useAuthStore } from '../utilis/auth';
import LoadSpinner from './LoadSpinner';

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
    <div className="space-y-4 p-0 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
        <div className="flex items-center space-x-2">
          <FiShoppingCart className="text-purple-600" size={20} />
          <h2 className="text-xl font-bold text-gray-800">Order Management</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <AddOrder />
          <div className="relative">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-1 border border-gray-200 rounded-xl w-64 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="complete">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
          <FiAlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="hidden md:grid grid-cols-7 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
          <div>Name</div>
          <div>Description</div>
          <div>Phone</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Date</div>
          <div>Action</div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <div key={order.id} className="hover:bg-gray-50 transition-colors">
                {/* Desktop Row */}
                <div className="hidden md:grid grid-cols-7 px-6 py-4 items-center text-sm">
                  <div className="font-medium text-gray-900">{order.orderName}</div>
                  <div className="text-gray-600 truncate">{order.description}</div>
                  <div className="text-purple-600 font-medium">{order.phoneNumber}</div>
                  <div className="font-semibold">₦{order.amount?.toLocaleString()}</div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
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
                  <div>
                    <a href={`/order/${order._id}`} className="text-purple-600 hover:underline">View</a>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden px-4 py-4 space-y-2 border-b">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{order.orderName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{order.description}</p>
                  <div className="text-sm text-gray-700">
                    <div><strong>Phone:</strong> {order.phoneNumber}</div>
                    <div><strong>Amount:</strong> ₦{order.amount?.toLocaleString()}</div>
                    <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                    <a href={`/order/${order._id}`} className="text-purple-600 hover:underline block mt-2">View Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange('previous')}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600 text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
