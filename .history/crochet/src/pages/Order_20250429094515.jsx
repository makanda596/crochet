import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
  const deleteOrder = async ()=>{
    try{
    const token = localStorage.getItem("token");
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/orders/deleteOrder/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )}catch(error){
      setError('failed to delete project',error.message)
    }
  }
  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/cancelStatus/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    } catch (error) {
      setError('failed to cancel order ', error.message)
    }
  }


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
          <button onClick={deleteOrder}>delete</button>
          <button  onClick={cancelOrder} className='text-green-400'>cancel order</button>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
};

export default Order;
