import React, { useState } from 'react';

const OrderFormModal = ({ closeModal }) => {
    // Form data state
    const [orderData, setOrderData] = useState({
        customerName: '',
        product: '',
        quantity: '',
        status: 'Pending',
        date: '',
        totalAmount: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order Submitted:', orderData);
        // You can call an API to submit the data, for example
        closeModal(); // Close modal after submission
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Order</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Customer Name */}
                    <div>
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                            Customer Name
                        </label>
                        <input
                            id="customerName"
                            name="customerName"
                            type="text"
                            value={orderData.customerName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Product */}
                    <div>
                        <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                            Product
                        </label>
                        <input
                            id="product"
                            name="product"
                            type="text"
                            value={orderData.product}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={orderData.quantity}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={orderData.status}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Order Date */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Order Date
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={orderData.date}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Total Amount */}
                    <div>
                        <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                            Total Amount ($)
                        </label>
                        <input
                            id="totalAmount"
                            name="totalAmount"
                            type="number"
                            value={orderData.totalAmount}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Submit Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderFormModal;
