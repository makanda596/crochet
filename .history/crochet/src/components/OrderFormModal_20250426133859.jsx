import React, { useState } from 'react';

const OrderFormModal = ({ closeModal }) => {
    // Form data state
    const [orderData, setOrderData] = useState({
        orderName: '',
        description: '',
        phoneNumber: '',
        amount:""
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
                            id="orderName"
                            name="orderName"
                            type="text"
                            value={orderData.orderName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>


                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Descprition
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={orderData.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            phoneNumber
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="number"
                            value={orderData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>                 

                    <div>
                        <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                            amount
                        </label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            value={orderData.amount}
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
