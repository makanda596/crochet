import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders/getorder/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrder(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/orders/deleteOrder/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Order deleted successfully.");
      setTimeout(() => navigate("/orders"), 1500);
    } catch (error) {
      setError('Failed to delete order');
    }
  };

  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders/cancelStatus/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Order cancelled.");
      fetchOrder();
    } catch (error) {
      setError('Failed to cancel order');
    }
  };

  const completeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders/completeStatus/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Order marked as complete.");
      fetchOrder();
    } catch (error) {
      setError('Failed to complete order');
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {order ? (
        <div className="space-y-3 text-gray-700">
          <p><strong>Name:</strong> {order.orderName}</p>
          <p><strong>Description:</strong> {order.description}</p>
          <p><strong>Phone:</strong> {order.phoneNumber}</p>
          <p><strong>Amount:</strong> ₦{order.amount?.toLocaleString()}</p>
          <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={completeOrder}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Mark as Complete
            </button>
            <button
              onClick={cancelOrder}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Cancel Order
            </button>
            <button
              onClick={deleteOrder}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Order
            </button>
          </div>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
};

export default Order;
