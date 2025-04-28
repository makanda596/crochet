import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Order = () => {
  const { id } = useParams(); // Get `id` from URL
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/getorder/${id}`);
      setOrder(response.data);
    } catch (err) {
      setError('Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      {order ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {order.orderName}</p>
          <p><strong>Description:</strong> {order.description}</p>
          <p><strong>Phone:</strong> {order.phoneNumber}</p>
          <p><strong>Amount:</strong> ₦{order.amount?.toLocaleString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
};

export default Order;
