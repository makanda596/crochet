import React, { useState } from 'react';

const AddOrderForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    orderName: '',
    phoneNumber: '',
    description: '',
    amount: '',
    status: 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Order:', formData);
    // You'd usually call a store method or API here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md z-50">
        <h3 className="text-xl font-bold mb-4">Add New Order</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="orderName"
            placeholder="Order Name"
            value={formData.orderName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderForm;
